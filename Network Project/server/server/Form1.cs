using System;
using System.IO;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace server
{
    
    public partial class Form1 : Form
    {

        Socket serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
        List<Socket> clientSockets = new List<Socket>();
        List<String> clientNames = new List<String>();
        public static string data;
        bool terminating = false;
        bool listening = false;
        string filePath = "";
        string databaseFile = "db.txt";

        public Form1()
        {

            Control.CheckForIllegalCrossThreadCalls = false;
            this.FormClosing += new FormClosingEventHandler(Form1_FormClosing);
            InitializeComponent();
        }

        private void button_listen_Click(object sender, EventArgs e)
        {
            int serverPort;
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    filePath = fbd.SelectedPath;
                }
            }

            if (Int32.TryParse(textBox_port.Text, out serverPort))
            {
                IPEndPoint endPoint = new IPEndPoint(IPAddress.Any, serverPort);
                serverSocket.Bind(endPoint);
                serverSocket.Listen(3);

                listening = true;
                button_listen.Enabled = false;


                Thread acceptThread = new Thread(Accept);
                acceptThread.Start();

                logs.AppendText("Started listening on port: " + serverPort + "\n");

            }
            else
            {
                logs.AppendText("Please check port number \n");
            }
        }

        private void Accept()
        {
            while(listening)
            {
                try
                {
                    Socket newClient = serverSocket.Accept();

                    // Get the client's username before accepting the connection.
                    Byte[] buffer = new Byte[64];
                    newClient.Receive(buffer);
                    string username = Encoding.Default.GetString(buffer);
                    username = username.Substring(0, username.IndexOf("\0"));
                    

                    if (clientNames.Contains(username) == true) {

                        string response = "0";
                        Byte[] response_buffer = Encoding.Default.GetBytes(response);
                        newClient.Send(response_buffer);

                        logs.AppendText("A client tried to connect with an existing username.\n"); }
                    else {

                        string response = "1";
                        Byte[] response_buffer = Encoding.Default.GetBytes(response);
                        newClient.Send(response_buffer);

                        clientNames.Add(username);
                        clientSockets.Add(newClient);
                        logs.AppendText("A client is connected with username " + username + "\n");
                        Thread receiveThread = new Thread(() => Receive(newClient,username)); // updated
                        receiveThread.Start();
                    }
                    
                }
                catch
                {
                    if (terminating)
                    {
                        listening = false;
                    }
                    else
                    {
                        logs.AppendText("The socket stopped working.\n");
                    }

                }
            }
        }

        public void ReceiveFile(bool connected, Socket thisClient, string username)
        {
            Byte[] buffer = new Byte[0];
            SocketError errorCode;
            data = "";
            // while connected read the data by 100 byte in each iteration.
            while (connected)
            {
                Byte[] buffer1 = new Byte[64];
                thisClient.Receive(buffer1);


                string fileName = Encoding.Default.GetString(buffer1);


                fileName = fileName.Substring(0, fileName.IndexOf("\0"));
                string[] words = fileName.Split('\\');

                var item = words[words.Length - 1];
                logs.AppendText("Client: " + username + " sent a file named " + item + "\n");
                item = item.Substring(0, item.Length - 4);

                Stream fs;
                int ctr = 0;
                string fp;
                string fpForDB;
                while (true)
                {
                    if (File.Exists(@filePath + "\\" + username + item + "-" + ctr.ToString() + ".txt"))
                    {
                        ctr += 1;
                        continue;

                    }
                    else
                    {
                        logs.AppendText("File is written to " + filePath + "\n");
                        fs = new FileStream(@filePath + "\\" + username + item + "-" + ctr.ToString() + ".txt",FileMode.Create);
                        fp = @filePath + "\\" + username + item + "-" + ctr.ToString() + ".txt";
                        fpForDB = @filePath + "\\" + item + "-" + ctr.ToString() + ".txt";
                        ctr = 0;
                        break;

                    }
                }
                int readBytes = -1;
                while (true)
                {
                    buffer = new Byte[100];

                    readBytes = thisClient.Receive(buffer, 0, 100, SocketFlags.None, out errorCode);
                    data = Encoding.Default.GetString(buffer);
                    Console.WriteLine(data);
                    // EOF
                    if (data.IndexOf(((char)3).ToString()) > -1 || data == "")
                    {
                        break;
                    }
                    fs.Write(buffer, 0, readBytes);
                }
                fs.Write(buffer, 0, readBytes - 1);
                fs.Close();
                
                using (StreamWriter sw = File.AppendText(@filePath + "\\" + databaseFile))
                {
                    long fileSize;
                    using (FileStream fileReader = File.Open(fp, FileMode.Open))
                    {
                        fileSize = fileReader.Length;
                    }
                    string[] parsedPath = fpForDB.Split('\\');
                    string entry = parsedPath[parsedPath.Length - 1] + "\t" + username + "\t" + fileSize + "\t" + DateTime.Now.ToUniversalTime() + "\t" + "Private";
                    sw.WriteLine(entry);
                }

                break;
            }            
        }

        private string parseLine(string username,string line)
        {
            string[] entries = line.Split('\t');
            string fileUser = entries[1];

            if (fileUser != username) return null;

            string filePath = entries[0];
            string fileName = filePath.Substring(filePath.LastIndexOf('\\'));
            int index = fileName.IndexOf(username);
            if (index == -1) return null;
            string fileNameWithoutUsername = fileName.Substring(index);
            string size = entries[2];
            string date = entries[3];
            string accesType = entries[4];

            return fileNameWithoutUsername + "\t" + size + "\t" + date + "\t" + accesType;

        }

        private void ListFile(bool connected, Socket thisClient, string username)
        {

            if(File.Exists(filePath + "\\" + databaseFile) == false)
            {
                Byte[] buffer = new Byte[256];
                string msg = "No files recorded in database!";
                buffer = Encoding.Default.GetBytes(msg + "\n");
                thisClient.Send(buffer);
                return;
            }

            using (StreamReader file = new StreamReader(@filePath + "\\" + databaseFile))
            {

                string ln;

                while ((ln = file.ReadLine()) != null)
                {
                    Byte[] buffer = new Byte[1000];
                    string[] entries = ln.Split('\t');
                    if(entries[1] == username)
                    {
                        string result = entries[0] + "\t" + entries[1] + "\t" + entries[2] + "\t" + entries[3] + "\tPublic";
                        buffer = Encoding.Default.GetBytes(result + "\n");
                        thisClient.Send(buffer);
                    }
                }
                file.Close();
            }
        }
        private void SendFile(Socket thisClient, string username)
        {
            Byte[] command = new Byte[64];
            string commandStr = "\n";
            command = Encoding.Default.GetBytes(commandStr);
            thisClient.Send(command);

            Byte[] filePathReceived = new Byte[256];
            thisClient.Receive(filePathReceived);
            string strPath = Encoding.Default.GetString(filePathReceived);
            strPath = strPath.Substring(0, strPath.IndexOf("\0"));

            string owner = "";

            bool isAutharized = false;

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + strPath;

                while ((line = sr.ReadLine()) != null)
                {
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[0] == fileToLookFor)
                    {
                        isAutharized = true;
                        owner = entries[1];
                        break;
                    }
                    else if(entries[0] == strPath && entries[4] == "Public")
                    {
                        owner = entries[1];
                        isAutharized = true;
                        break;
                    }
                }
            }

            if (!isAutharized)
            {
                Byte[] msg = new Byte[64];
                msg = Encoding.Default.GetBytes("Client has no permission!\n");
                logs.AppendText("Client has no permission!\n");
                thisClient.Send(msg);
                return;
            }

            byte[] postBuf = Encoding.ASCII.GetBytes(((char)3).ToString());
            if(File.Exists(@filePath + "\\" + owner + strPath))
            {
                thisClient.SendFile(@filePath + "\\" + owner + strPath, null, postBuf, TransmitFileOptions.UseDefaultWorkerThread);
                logs.AppendText("File sent to client!\n");
            }
            else
            {
                Byte[] msg = new Byte[64];
                msg = Encoding.Default.GetBytes("File not found!\n");
                logs.AppendText("File not found!\n");
                thisClient.Send(msg);
            }
        }

        private void SendFile2(Socket thisClient, string username)
        {
            Byte[] command = new Byte[64];
            string commandStr = "\n";
            command = Encoding.Default.GetBytes(commandStr);
            thisClient.Send(command);

            Byte[] filePathReceived = new Byte[256];
            thisClient.Receive(filePathReceived);
            string strPath = Encoding.Default.GetString(filePathReceived);
            strPath = strPath.Substring(0, strPath.IndexOf("\0"));

            string owner = "";

            bool isAutharized = false;

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + strPath;

                while ((line = sr.ReadLine()) != null)
                {
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[1] + entries[0] == fileToLookFor && entries[4] == "Public")
                    {
                        isAutharized = true;
                        owner = entries[1];
                        break;
                    }
                    
                }
            }

            if (!isAutharized)
            {
                Byte[] msg = new Byte[64];
                msg = Encoding.Default.GetBytes("Client has no permission!\n");
                logs.AppendText("Client has no permission!\n");
                thisClient.Send(msg);
                return;
            }

            byte[] postBuf = Encoding.ASCII.GetBytes(((char)3).ToString());
            if (File.Exists(@filePath + "\\" + strPath))
            {
                thisClient.SendFile(@filePath + "\\" + strPath, null, postBuf, TransmitFileOptions.UseDefaultWorkerThread);
                logs.AppendText("File sent to client!\n");
            }
            else
            {
                Byte[] msg = new Byte[64];
                msg = Encoding.Default.GetBytes("File not found!\n");
                logs.AppendText("File not found!\n");
                thisClient.Send(msg);
            }
        }

        private void CopyFiles(Socket thisClient,string username)
        {
            Byte[] msg = new Byte[256];
            thisClient.Receive(msg);
            string fileToCopy = Encoding.Default.GetString(msg); 
            fileToCopy = fileToCopy.Substring(0, fileToCopy.IndexOf("\0"));
            fileToCopy = fileToCopy.Substring(0, fileToCopy.IndexOf(".txt")); 

            string fpForDB;

            bool isAutharized = false;

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + username + fileToCopy +".txt";

                while ((line = sr.ReadLine()) != null)
                {
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[1] + entries[0] == fileToLookFor)
                    {
                        isAutharized = true;
                        break;
                    }
                }
            }

            if (!isAutharized)
            {
                Byte[] msg1 = new Byte[64];
                msg1 = Encoding.Default.GetBytes("Client has no permission!\n");
                logs.AppendText("Client has no permission!\n");
                thisClient.Send(msg1);
                return;
            }


            if (File.Exists(@filePath + "\\" + username + fileToCopy + ".txt") == false)
            {
                logs.AppendText("File not found, unable to copy!\n");
                return;
            }


            int ctr = 0;
            string fp;
            while (true)
            {
                if (File.Exists(@filePath + "\\" + username + fileToCopy + "-" + ctr.ToString() + ".txt"))
                {
                    ctr += 1;
                    continue;

                }
                else
                {
                    logs.AppendText("File is copied to " + filePath + "\n");
                    fp = @filePath + "\\" + username + fileToCopy + "-" + ctr.ToString() + ".txt";
                    fpForDB = @filePath + "\\"  + fileToCopy + "-" + ctr.ToString() + ".txt";
                    ctr = 0;
                    break;

                }
            }


            File.Copy(@filePath + "\\" + username + fileToCopy + ".txt", fp);
            string tempFile = Path.GetTempFileName();

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            using (StreamWriter sw = new StreamWriter(tempFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + username + fileToCopy + ".txt";

                while ((line = sr.ReadLine()) != null)
                {
                    sw.WriteLine(line);
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[1] + entries[0] == fileToLookFor)
                    {
                        string[] paths = fpForDB.Split('\\');
                        sw.WriteLine(paths[paths.Length -1] + "\t" + entries[1] + "\t" + entries[2] + "\t" + DateTime.Now.ToUniversalTime() + "\t" + entries[4]);
                    }
                }
            }
            File.Delete(@filePath + "\\" + databaseFile);
            File.Move(tempFile, @filePath + "\\" + databaseFile);
            logs.AppendText("File " + fileToCopy + " copied!\n");
        }
        private void DeleteFiles(Socket thisClient,string username)
        {
            Byte[] msg = new Byte[256];
            thisClient.Receive(msg);
            string fileToDelete = Encoding.Default.GetString(msg);
            fileToDelete = fileToDelete.Substring(0, fileToDelete.IndexOf("\0"));



            bool isAutharized = false;

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + username + fileToDelete;

                while ((line = sr.ReadLine()) != null)
                {
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[1] + entries[0] == fileToLookFor)
                    {
                        isAutharized = true;
                        break;
                    }
                }
            }
            if (!isAutharized)
            {
                Byte[] msg1 = new Byte[64];
                msg1 = Encoding.Default.GetBytes("Client has no permission!\n");
                logs.AppendText("Client has no permission!\n");
                thisClient.Send(msg1);
                return;
            }

            if (File.Exists(filePath + "\\" + username + fileToDelete) == false)
            {
                logs.AppendText("File not found,unable to delete!\n");
                return;
            }

            File.Delete(@filePath + "\\" + username + fileToDelete);
            string tempFile = Path.GetTempFileName();

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            using (StreamWriter sw = new StreamWriter(tempFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + username + fileToDelete;

                while ((line = sr.ReadLine()) != null)
                {
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[1] + entries[0] == fileToLookFor)
                    {

                    }
                    else
                    {
                        sw.WriteLine(line);
                    }

                }
            }
            File.Delete(@filePath + "\\" + databaseFile);
            File.Move(tempFile, @filePath + "\\" + databaseFile);
            logs.AppendText("File " + fileToDelete + " deleted!\n");
        }

        private void MakePublic(Socket thisClient,string username)
        {
            Byte[] msg = new Byte[256];
            thisClient.Receive(msg);
            string fileToPublic = Encoding.Default.GetString(msg);
            fileToPublic = fileToPublic.Substring(0, fileToPublic.IndexOf("\0"));
            string tempFile = Path.GetTempFileName();


            bool isAutharized = false;

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + username + fileToPublic;

                while ((line = sr.ReadLine()) != null)
                {
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[1] + entries[0] == fileToLookFor)
                    {
                        isAutharized = true;
                        break;
                    }
                }
            }

            if (!isAutharized)
            {
                Byte[] msg1 = new Byte[64];
                msg1 = Encoding.Default.GetBytes("Client has no permission!\n");
                logs.AppendText("Client has no permission!\n");
                thisClient.Send(msg1);
                return;
            }

            using (StreamReader sr = new StreamReader(@filePath + "\\" + databaseFile))
            using (StreamWriter sw = new StreamWriter(tempFile))
            {
                string line;
                string fileToLookFor = filePath + "\\" + username + fileToPublic;

                while ((line = sr.ReadLine()) != null)
                {
                    string[] entries = line.Split('\t');
                    if (filePath + "\\" + entries[1] + entries[0] == fileToLookFor)
                    {
                        sw.WriteLine(entries[0] + "\t" + entries[1] + "\t" + entries[2] + "\t" + entries[3] + "\tPublic");
                    }
                    else
                    {
                        sw.WriteLine(line);
                    }

                }
            }
            File.Delete(@filePath + "\\" + databaseFile);
            File.Move(tempFile, @filePath + "\\" + databaseFile);
            logs.AppendText(fileToPublic + " is now public!\n");
        }

        private void ListPublicFiles(Socket thisClient)
        {
            if (File.Exists(filePath + "\\" + databaseFile) == false)
            {
                Byte[] buffer = new Byte[256];
                string msg = "No files recorded in database!";
                buffer = Encoding.Default.GetBytes(msg + "\n");
                thisClient.Send(buffer);
                return;
            }

            using (StreamReader file = new StreamReader(@filePath + "\\" + databaseFile))
            {

                string ln;

                while ((ln = file.ReadLine()) != null)
                {
                    Byte[] buffer = new Byte[1000];
                    string[] entries = ln.Split('\t');
                    if(entries[4] == "Public")
                    {
                        string result = entries[0] + "\t" + entries[1] + "\t" + entries[2] + "\t" + entries[3] + "\tPublic";
                        buffer = Encoding.Default.GetBytes(result + "\n");
                        thisClient.Send(buffer);
                    }
                }
                file.Close();
            }
        }
        private void Receive(Socket thisClient, string username) // updated
        {       
            bool connected = true;

            while(connected)
            {
                try
                {
                    Byte[] command = new Byte[64];
                    thisClient.Receive(command);
                    string strCommand = Encoding.Default.GetString(command);
                    strCommand = strCommand.Substring(0, strCommand.IndexOf("\0"));
                    logs.AppendText(strCommand + "\n");
                    if (strCommand == "Send Files")
                    {
                        logs.AppendText("Receive Files...\n");
                        ReceiveFile(connected, thisClient, username);
                    }
                    else if(strCommand == "List Files")
                    {
                        logs.AppendText("Listing Files...\n");
                        ListFile(connected, thisClient, username);
                    }
                    else if(strCommand == "Download Files")
                    {
                        logs.AppendText("Downloading File...\n");
                        SendFile(thisClient,username);
                    }
                    else if (strCommand == "Download Public Files")
                    {
                        logs.AppendText("Downloading File...\n");
                        SendFile2(thisClient, username);
                    }
                    else if(strCommand == "Copy Files")
                    {
                        logs.AppendText("Copying File...\n");
                        CopyFiles(thisClient,username);
                    }
                    else if(strCommand == "Delete Files")
                    {
                        logs.AppendText("Deleting File...\n");
                        DeleteFiles(thisClient, username);
                    }
                    else if(strCommand == "Make Public")
                    {
                        logs.AppendText("Changing Access Type To Public...\n");
                        MakePublic(thisClient, username);
                    }      
                    else if(strCommand == "Request Public")
                    {
                        logs.AppendText("Listing Public Files...\n");
                        ListPublicFiles(thisClient);
                    }                          
                }
                catch
                {       
                    if (!terminating)
                    {
                        logs.AppendText("A client has disconnected\n");
                    }
                    thisClient.Close();
                    clientSockets.Remove(thisClient);
                    clientNames.Remove(username);
                    connected = false;
                }
            }
        }

        private void Form1_FormClosing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            listening = false;
            terminating = true;
            Environment.Exit(0);
        }

        private void logs_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox_port_TextChanged(object sender, EventArgs e)
        {

        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {

        }

        private void folderBrowserDialog1_HelpRequest(object sender, EventArgs e)
        {

        }
    }
}
