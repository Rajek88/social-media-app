function appender(message, data, userEmail) {
  let newMessage = document.createElement("li");
  newMessage.innerHTML = `<h4>${message}</h4>`;
  if (data.userEmail == userEmail) {
    newMessage.setAttribute("id", "my-message");
  } else {
    newMessage.setAttribute("id", "other-message");
  }

  let chatBoxMsgList = document.querySelector(`#chat-msg-list`);
  chatBoxMsgList.append(newMessage);
  return;
}

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
        userEmail: self.userEmail,
        chatRoom: "room-1",
      });
    });

    const sendbtn = document.querySelector("#send-msg");
    sendbtn.addEventListener("click", function () {
      let msg = document.querySelector("#msg-input").value;
      console.log("Message btn clicked : ", msg);

      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          userEmail: self.userEmail,
          chatRoom: "room-1",
        });
        console.log("Message sent : ", msg);
      }
    });

    // create msg element annd append it to chatbox

    self.socket.on("receive_message", function (data) {
      console.log("Message received : ", data.message);

      appender(data.message, data, self.userEmail);
    });
  }
}
