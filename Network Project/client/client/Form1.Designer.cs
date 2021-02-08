namespace client
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.textBox_ip = new System.Windows.Forms.TextBox();
            this.textBox_port = new System.Windows.Forms.TextBox();
            this.button_connect = new System.Windows.Forms.Button();
            this.logs = new System.Windows.Forms.RichTextBox();
            this.textBox_message = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.button_send = new System.Windows.Forms.Button();
            this.fileSystemWatcher1 = new System.IO.FileSystemWatcher();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.button1 = new System.Windows.Forms.Button();
            this.reqFileButton = new System.Windows.Forms.Button();
            this.downloadPath = new System.Windows.Forms.RichTextBox();
            this.selectFolderButton = new System.Windows.Forms.Button();
            this.downloadFileButton = new System.Windows.Forms.Button();
            this.selectedFolder = new System.Windows.Forms.RichTextBox();
            this.copyButton = new System.Windows.Forms.Button();
            this.deleteFile = new System.Windows.Forms.Button();
            this.requestPublicButton = new System.Windows.Forms.Button();
            this.makePublicButton = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.fileSystemWatcher1)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(59, 64);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(24, 17);
            this.label1.TabIndex = 0;
            this.label1.Text = "IP:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(45, 97);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(38, 17);
            this.label2.TabIndex = 1;
            this.label2.Text = "Port:";
            // 
            // textBox_ip
            // 
            this.textBox_ip.Location = new System.Drawing.Point(97, 60);
            this.textBox_ip.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBox_ip.Name = "textBox_ip";
            this.textBox_ip.Size = new System.Drawing.Size(129, 22);
            this.textBox_ip.TabIndex = 2;
            this.textBox_ip.Text = "192.168.1.101";
            this.textBox_ip.TextChanged += new System.EventHandler(this.textBox_ip_TextChanged);
            // 
            // textBox_port
            // 
            this.textBox_port.Location = new System.Drawing.Point(97, 97);
            this.textBox_port.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBox_port.Name = "textBox_port";
            this.textBox_port.Size = new System.Drawing.Size(129, 22);
            this.textBox_port.TabIndex = 3;
            this.textBox_port.Text = "7999";
            this.textBox_port.TextChanged += new System.EventHandler(this.textBox_port_TextChanged);
            // 
            // button_connect
            // 
            this.button_connect.Location = new System.Drawing.Point(97, 160);
            this.button_connect.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.button_connect.Name = "button_connect";
            this.button_connect.Size = new System.Drawing.Size(131, 27);
            this.button_connect.TabIndex = 4;
            this.button_connect.Text = "connect";
            this.button_connect.UseVisualStyleBackColor = true;
            this.button_connect.Click += new System.EventHandler(this.button_connect_Click);
            // 
            // logs
            // 
            this.logs.Location = new System.Drawing.Point(315, 60);
            this.logs.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.logs.Name = "logs";
            this.logs.Size = new System.Drawing.Size(457, 213);
            this.logs.TabIndex = 5;
            this.logs.Text = "";
            this.logs.TextChanged += new System.EventHandler(this.logs_TextChanged);
            // 
            // textBox_message
            // 
            this.textBox_message.Location = new System.Drawing.Point(97, 130);
            this.textBox_message.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.textBox_message.Name = "textBox_message";
            this.textBox_message.Size = new System.Drawing.Size(129, 22);
            this.textBox_message.TabIndex = 6;
            this.textBox_message.Text = "bizer";
            this.textBox_message.TextChanged += new System.EventHandler(this.textBox_message_TextChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(15, 134);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(77, 17);
            this.label3.TabIndex = 7;
            this.label3.Text = "Username:";
            // 
            // button_send
            // 
            this.button_send.Enabled = false;
            this.button_send.Location = new System.Drawing.Point(63, 343);
            this.button_send.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.button_send.Name = "button_send";
            this.button_send.Size = new System.Drawing.Size(195, 42);
            this.button_send.TabIndex = 8;
            this.button_send.Text = "Send";
            this.button_send.UseVisualStyleBackColor = true;
            this.button_send.Click += new System.EventHandler(this.button_send_Click);
            // 
            // fileSystemWatcher1
            // 
            this.fileSystemWatcher1.EnableRaisingEvents = true;
            this.fileSystemWatcher1.SynchronizingObject = this;
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            this.openFileDialog1.FileOk += new System.ComponentModel.CancelEventHandler(this.openFileDialog1_FileOk);
            // 
            // button1
            // 
            this.button1.Enabled = false;
            this.button1.Location = new System.Drawing.Point(97, 193);
            this.button1.Margin = new System.Windows.Forms.Padding(4);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(131, 27);
            this.button1.TabIndex = 9;
            this.button1.Text = "disconnect";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // reqFileButton
            // 
            this.reqFileButton.Enabled = false;
            this.reqFileButton.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.reqFileButton.Location = new System.Drawing.Point(97, 228);
            this.reqFileButton.Margin = new System.Windows.Forms.Padding(4);
            this.reqFileButton.Name = "reqFileButton";
            this.reqFileButton.Size = new System.Drawing.Size(131, 36);
            this.reqFileButton.TabIndex = 10;
            this.reqFileButton.Text = "Request Files";
            this.reqFileButton.UseVisualStyleBackColor = true;
            this.reqFileButton.Click += new System.EventHandler(this.reqFileButton_Click);
            // 
            // downloadPath
            // 
            this.downloadPath.Enabled = false;
            this.downloadPath.Location = new System.Drawing.Point(63, 505);
            this.downloadPath.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.downloadPath.Name = "downloadPath";
            this.downloadPath.Size = new System.Drawing.Size(709, 42);
            this.downloadPath.TabIndex = 11;
            this.downloadPath.Text = "";
            // 
            // selectFolderButton
            // 
            this.selectFolderButton.Enabled = false;
            this.selectFolderButton.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.selectFolderButton.Location = new System.Drawing.Point(63, 412);
            this.selectFolderButton.Margin = new System.Windows.Forms.Padding(4);
            this.selectFolderButton.Name = "selectFolderButton";
            this.selectFolderButton.Size = new System.Drawing.Size(195, 36);
            this.selectFolderButton.TabIndex = 12;
            this.selectFolderButton.Text = "Select Folder";
            this.selectFolderButton.UseVisualStyleBackColor = true;
            this.selectFolderButton.Click += new System.EventHandler(this.selectFolderButton_Click);
            // 
            // downloadFileButton
            // 
            this.downloadFileButton.Enabled = false;
            this.downloadFileButton.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.downloadFileButton.Location = new System.Drawing.Point(63, 572);
            this.downloadFileButton.Margin = new System.Windows.Forms.Padding(4);
            this.downloadFileButton.Name = "downloadFileButton";
            this.downloadFileButton.Size = new System.Drawing.Size(127, 36);
            this.downloadFileButton.TabIndex = 13;
            this.downloadFileButton.Text = "Download File";
            this.downloadFileButton.UseVisualStyleBackColor = true;
            this.downloadFileButton.Click += new System.EventHandler(this.downloadFileButton_Click);
            // 
            // selectedFolder
            // 
            this.selectedFolder.Enabled = false;
            this.selectedFolder.Location = new System.Drawing.Point(315, 405);
            this.selectedFolder.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.selectedFolder.Name = "selectedFolder";
            this.selectedFolder.Size = new System.Drawing.Size(457, 42);
            this.selectedFolder.TabIndex = 14;
            this.selectedFolder.Text = "";
            // 
            // copyButton
            // 
            this.copyButton.Enabled = false;
            this.copyButton.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.copyButton.Location = new System.Drawing.Point(387, 572);
            this.copyButton.Margin = new System.Windows.Forms.Padding(4);
            this.copyButton.Name = "copyButton";
            this.copyButton.Size = new System.Drawing.Size(155, 36);
            this.copyButton.TabIndex = 15;
            this.copyButton.Text = "Copy File";
            this.copyButton.UseVisualStyleBackColor = true;
            this.copyButton.Click += new System.EventHandler(this.copyButton_Click);
            // 
            // deleteFile
            // 
            this.deleteFile.Enabled = false;
            this.deleteFile.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.deleteFile.Location = new System.Drawing.Point(610, 572);
            this.deleteFile.Margin = new System.Windows.Forms.Padding(4);
            this.deleteFile.Name = "deleteFile";
            this.deleteFile.Size = new System.Drawing.Size(164, 36);
            this.deleteFile.TabIndex = 16;
            this.deleteFile.Text = "Delete File";
            this.deleteFile.UseVisualStyleBackColor = true;
            this.deleteFile.Click += new System.EventHandler(this.deleteFile_Click);
            // 
            // requestPublicButton
            // 
            this.requestPublicButton.Enabled = false;
            this.requestPublicButton.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.requestPublicButton.Location = new System.Drawing.Point(97, 271);
            this.requestPublicButton.Margin = new System.Windows.Forms.Padding(4);
            this.requestPublicButton.Name = "requestPublicButton";
            this.requestPublicButton.Size = new System.Drawing.Size(131, 36);
            this.requestPublicButton.TabIndex = 17;
            this.requestPublicButton.Text = "Request Public Files";
            this.requestPublicButton.UseVisualStyleBackColor = true;
            this.requestPublicButton.Click += new System.EventHandler(this.requestPublicButton_Click);
            // 
            // makePublicButton
            // 
            this.makePublicButton.Enabled = false;
            this.makePublicButton.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.makePublicButton.Location = new System.Drawing.Point(315, 641);
            this.makePublicButton.Margin = new System.Windows.Forms.Padding(4);
            this.makePublicButton.Name = "makePublicButton";
            this.makePublicButton.Size = new System.Drawing.Size(195, 36);
            this.makePublicButton.TabIndex = 18;
            this.makePublicButton.Text = "Make Public";
            this.makePublicButton.UseVisualStyleBackColor = true;
            this.makePublicButton.Click += new System.EventHandler(this.makePublicButton_Click);
            // 
            // button2
            // 
            this.button2.Enabled = false;
            this.button2.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.button2.Location = new System.Drawing.Point(221, 572);
            this.button2.Margin = new System.Windows.Forms.Padding(4);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(127, 36);
            this.button2.TabIndex = 19;
            this.button2.Text = "Download Public";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(840, 692);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.makePublicButton);
            this.Controls.Add(this.requestPublicButton);
            this.Controls.Add(this.deleteFile);
            this.Controls.Add(this.copyButton);
            this.Controls.Add(this.selectedFolder);
            this.Controls.Add(this.downloadFileButton);
            this.Controls.Add(this.selectFolderButton);
            this.Controls.Add(this.downloadPath);
            this.Controls.Add(this.reqFileButton);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.button_send);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.textBox_message);
            this.Controls.Add(this.logs);
            this.Controls.Add(this.button_connect);
            this.Controls.Add(this.textBox_port);
            this.Controls.Add(this.textBox_ip);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "Form1";
            this.Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.fileSystemWatcher1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBox_ip;
        private System.Windows.Forms.TextBox textBox_port;
        private System.Windows.Forms.Button button_connect;
        private System.Windows.Forms.RichTextBox logs;
        private System.Windows.Forms.TextBox textBox_message;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button button_send;
        private System.IO.FileSystemWatcher fileSystemWatcher1;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button reqFileButton;
        private System.Windows.Forms.Button selectFolderButton;
        private System.Windows.Forms.RichTextBox downloadPath;
        private System.Windows.Forms.Button downloadFileButton;
        private System.Windows.Forms.RichTextBox selectedFolder;
        private System.Windows.Forms.Button copyButton;
        private System.Windows.Forms.Button deleteFile;
        private System.Windows.Forms.Button makePublicButton;
        private System.Windows.Forms.Button requestPublicButton;
        private System.Windows.Forms.Button button2;
    }
}

