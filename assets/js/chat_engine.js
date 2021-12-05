class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = document.querySelector(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.socket = io.connect("http://localhost:5000");

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    this.socket.on("connect", function () {
      console.log("Connection Established using sockets");
    });
  }
}
