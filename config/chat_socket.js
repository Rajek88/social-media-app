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

    console.log("New connection received : ", socket.id);
  });
};
