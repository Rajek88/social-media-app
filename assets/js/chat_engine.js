class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = document.querySelector(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.socket = io.connect("http://localhost:5000");

    if (this.userEmail) {
      // console.log("Useremail for socket : ", userEmail);
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    self.socket.on("connect", function () {
      console.log("Connection Established using sockets");

      // emit an event on socket io with any relevant name
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatRoom: "room-1",
      });
    });
  }
}
