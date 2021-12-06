module.exports.ChatSocket = function (chatServer) {
  let io = require("socket.io")(chatServer, {
    //   use below properties to handle cross origin requests over localhost:8000 which run express server
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
    },
  });
  // in frontend i.e. chat_engine.js we have used on('connect') which fires the connection on the backend
  io.sockets.on("connection", function (socket, err) {
    if (err) {
      console.log("Error with new connection ");
      return;
    }
    // handle disconnect eventwhich is JS event
    socket.on("disconnect", function () {
      console.log("Disconnected the connection");
    });

    socket.on("join_room", function (data) {
      console.log("join room request data : ", data);

      // now join the socket  to the chatroom
      socket.join(data.chatRoom);

      // now I want to show notification to users when I or anyone joins the room
      // for that I need to emit an event inside the room, so :

      io.in(data.chatRoom).emit("User joined", data);
    });

    console.log("New connection received : ", socket.id);

    // message handlers
    socket.on("send_message", function (data) {
      io.in(data.chatRoom).emit("receive_message", data);
    });
  });
};
