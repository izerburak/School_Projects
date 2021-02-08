using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace client
{
    public partial class Form1 : Form
    {

        bool terminating = false;
        bool connected = false;
        Socket clientSocket;
        string downloadPathStr;

        public Form1()
        {

            Control.CheckForIllegalCrossThreadCalls = false;
            this.FormClosing += new FormClosingEventHandler(Form1_FormClosing);
            InitializeComponent();
        }

        private void button_connect_Click(object sender, EventArgs e)
        {
            clientSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            string IP = textBox_ip.Text;

            int portNum;
            if (Int32.TryParse(textBox_port.Text, out portNum))
            {
                try
                {
                    clientSocket.Connect(IP, portNum);

                    // Send the username upon connection, message field represents the username
                    string message = textBox_message.Text;
                    if (message != "" && message.Length <= 64)
                    {
                        Byte[] buffer = new Byte[1000];
                        buffer = Encoding.Default.GetBytes(message);
                        clientSocket.Send(buffer);

                        Byte[] response = new Byte[1000];
                        clientSocket.Receive(response);
                        string response_string = Encoding.Default.GetString(response);

                        
                        if (response_string.StartsWith("1"))
                        {
                            button_connect.Enabled = false;
                            textBox_message.Enabled = true;
                            button_send.Enabled = true;
                            connected = true;
                            logs.AppendText("Connected to the server!\n");

                            Thread receiveThread = new Thread(() => Receive(clientSocket)); // updated
                            receiveThread.Start();
                            button1.Enabled = true;
                            button_connect.Enabled = false;
                            reqFileButton.Enabled = true;
                            downloadPath.Enabled = true;
                            selectFolderButton.Enabled = true;
                            copyButton.Enabled = true;
                            deleteFile.Enabled = true;
                            requestPublicButton.Enabled = true;
                            makePublicButton.Enabled = true;
                        }
                        else
                        {

                            logs.AppendText("Username already exists!\n");

                        }
                    }

                }
                catch
                {
                    logs.AppendText("Could not connect to the server!\n");
                }
            }
            else
            {
                logs.AppendText("Check the port\n");
            }

        }

        /*
         * s.Poll returns true if 
	            connection is closed, reset, terminated or pending (meaning no active connection)
	            connection is active and there is data available for reading
            s.Available returns number of bytes available for reading
            if both are true:
	            there is no data available to read so connection is not active
         */

        bool SocketConnected(Socket s)
        {
            bool part1 = s.Poll(1000, SelectMode.SelectRead);
            bool part2 = (s.Available == 0);
            if (part1 && part2)
                return false;
            else
                return true;
        }

        private void Receive(Socket thisClient)
        {
            while (connected)
            {
                if (SocketConnected(thisClient))
                {
                   
                }
                else
                {
                    connected = false;
                    clientSocket.Close();
                    logs.AppendText("Disconnected\n");
                    button_connect.Enabled = true;
                    terminating = true;
                    button_send.Enabled = false;
                    button1.Enabled = false;
                    reqFileButton.Enabled = false;
                }
                try
                {
                    Byte[] msg = new Byte[64];
                    clientSocket.Receive(msg);
                    string strMsg = Encoding.Default.GetString(msg);
                    if(strMsg.IndexOf("\0") != -1)
                    {
                        strMsg = strMsg.Substring(0, strMsg.IndexOf("\0"));
                    }
                    logs.AppendText(strMsg);

                }
                catch
                {

                }
            }
        }

        private void Form1_FormClosing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            connected = false;
            terminating = true;
            Environment.Exit(0);
        }

        private void button_send_Click(object sender, EventArgs e)
        {
            if (connected)
            {
                this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog()
                {
                    Title = "Browse Text Files",

                    CheckFileExists = true,
                    CheckPathExists = true,

                    DefaultExt = "txt",
                    Filter = "txt files (*.txt)|*.txt",
                    FilterIndex = 2,
                    RestoreDirectory = true,

                    ReadOnlyChecked = true,
                    ShowReadOnly = true
                };

               // openFileDialog1.ShowDialog();

                if (openFileDialog1.ShowDialog() == DialogResult.OK)
                {
                    Byte[] command = new Byte[64];
                    string commandStr = "Send Files";
                    command = Encoding.Default.GetBytes(commandStr);
                    clientSocket.Send(command);
                    Thread.Sleep(1000);

                    Byte[] buffer1 = new Byte[64];
                    buffer1 = Encoding.Default.GetBytes(openFileDialog1.FileName);
                    clientSocket.Send(buffer1);
                    Thread.Sleep(1000); // :(

                    logs.AppendText("File sent to the server\n");

                    logs.AppendText("Path of the file: " + openFileDialog1.FileName + "\n");
                    String str = openFileDialog1.FileName;
                    byte[] postBuf = Encoding.ASCII.GetBytes(((char)3).ToString());
                    clientSocket.SendFile(str, null, postBuf, TransmitFileOptions.UseDefaultWorkerThread);

                }
            }


        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {

        }

        private void logs_TextChanged(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            connected = false;
            clientSocket.Close();
            logs.AppendText("Disconnected\n");
            button_connect.Enabled = true;
            terminating = true;
            button_send.Enabled = false;
            button1.Enabled = false;
            reqFileButton.Enabled = false;
            downloadPath.Enabled = false;
            selectFolderButton.Enabled = false;
            copyButton.Enabled = false;
            deleteFile.Enabled = false;
            requestPublicButton.Enabled = false;
            makePublicButton.Enabled = false;

        }

        private void textBox_port_TextChanged(object sender, EventArgs e)
        {

        }

        private void reqFileButton_Click(object sender, EventArgs e)
        {
            Byte[] buffer = new Byte[64];
            buffer = Encoding.Default.GetBytes("List Files");
            clientSocket.Send(buffer);


        }

        private void DownloadFile()
        {
            int readBytes = -1;
            string data = "";
            Byte[] buffer = new Byte[0];
            SocketError errorCode;
            Stream fs;
            int ctr = 0;

            string downloadedFilePath = downloadPath.Text.Replace(".txt",string.Empty);

            while (true)
            {
                if (File.Exists(@downloadPathStr + "\\"  + downloadedFilePath + "-" + ctr.ToString() + ".txt"))
                {
                    ctr += 1;
                    continue;

                }
                else
                {
                    logs.AppendText("File is being written to " + @downloadPathStr + "\n");
                    fs = new FileStream(@downloadPathStr + "\\" + downloadedFilePath + "-" + ctr.ToString() + ".txt", FileMode.Create);
                    ctr = 0;
                    break;

                }

            }
            while (true)
            {
                buffer = new Byte[100];

                readBytes = clientSocket.Receive(buffer, 0, 100, SocketFlags.None, out errorCode);
                data = Encoding.Default.GetString(buffer);
                Console.WriteLine(data);
                // EOF

                if (data.Contains("File not found!\n") || data.Contains("Client has no permission!\n"))
                {
                    logs.AppendText(data);
                    fs.Close();
                    Console.WriteLine(downloadPathStr + "\\" + downloadedFilePath + "-" + ctr.ToString() + ".txt");
                    File.Delete(@downloadPathStr + "\\" + downloadedFilePath + "-" + ctr.ToString() + ".txt");
                    return;
                }
                if (data.IndexOf(((char)3).ToString()) > -1 || data == "")
                {
                    break;
                }
                fs.Write(buffer, 0, readBytes);
            }
            fs.Write(buffer, 0, readBytes - 1);
            fs.Close();
            logs.AppendText("File is downloaded!\n");
        }

        private void selectFolderButton_Click(object sender, EventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    downloadPathStr = fbd.SelectedPath;
                    downloadFileButton.Enabled = true;
                    selectedFolder.Text = downloadPathStr;
                    button2.Enabled = true;
                }
            }
        }

        private void textBox_message_TextChanged(object sender, EventArgs e)
        {

        }

        private void downloadFileButton_Click(object sender, EventArgs e)
        {
            Byte[] buffer = new Byte[64];
            buffer = Encoding.Default.GetBytes("Download Files");
            clientSocket.Send(buffer);
            Thread.Sleep(1000);

            string tufirik = downloadPath.Text;

            if (tufirik == "")
                tufirik = "pikachu.txt";

            Byte[] buffer1 = new Byte[64];
            buffer1 = Encoding.Default.GetBytes(tufirik);
            clientSocket.Send(buffer1);
            Thread.Sleep(1000);

            DownloadFile();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Byte[] buffer = new Byte[64];
            buffer = Encoding.Default.GetBytes("Download Public Files");
            clientSocket.Send(buffer);
            Thread.Sleep(1000);

            string tufirik = downloadPath.Text;

            if (tufirik == "")
                tufirik = "pikachu.txt";

            Byte[] buffer1 = new Byte[64];
            buffer1 = Encoding.Default.GetBytes(tufirik);
            clientSocket.Send(buffer1);
            Thread.Sleep(1000);

            DownloadFile();

        }

        private void copyButton_Click(object sender, EventArgs e)
        {
            Byte[] buffer = new Byte[64];
            buffer = Encoding.Default.GetBytes("Copy Files");
            clientSocket.Send(buffer);
            Thread.Sleep(1000);

            string tufirik = downloadPath.Text;

            if (tufirik == "")
                tufirik = "pikachu.txt";

            Byte[] buffer1 = new Byte[64];
            buffer1 = Encoding.Default.GetBytes(tufirik);
            clientSocket.Send(buffer1);
            Thread.Sleep(1000);

        }

        private void deleteFile_Click(object sender, EventArgs e)
        {
            Byte[] buffer = new Byte[64];
            buffer = Encoding.Default.GetBytes("Delete Files");
            clientSocket.Send(buffer);
            Thread.Sleep(1000);

            string tufirik = downloadPath.Text;

            if (tufirik == "")
                tufirik = "pikachu.txt";

            Byte[] buffer1 = new Byte[64];
            buffer1 = Encoding.Default.GetBytes(tufirik);
            clientSocket.Send(buffer1);
            Thread.Sleep(1000);
        }

        private void makePublicButton_Click(object sender, EventArgs e)
        {
            Byte[] buffer = new Byte[64];
            buffer = Encoding.Default.GetBytes("Make Public");
            clientSocket.Send(buffer);
            Thread.Sleep(1000);

            string tufirik = downloadPath.Text;

            if (tufirik == "")
                tufirik = "pikachu.txt";

            Byte[] buffer1 = new Byte[64];
            buffer1 = Encoding.Default.GetBytes(tufirik);
            clientSocket.Send(buffer1);
            Thread.Sleep(1000);
        }

        private void requestPublicButton_Click(object sender, EventArgs e)
        {
            Byte[] buffer = new Byte[64];
            buffer = Encoding.Default.GetBytes("Request Public");
            clientSocket.Send(buffer);
        }

        private void textBox_ip_TextChanged(object sender, EventArgs e)
        {

        }

        
    }
}
