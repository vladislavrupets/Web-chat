const chatroomHandler = require("./socket-handlers/chatroomHandler");
const sendMessage = require("./socket-handlers/sendMessageHandler");

module.exports = function connectionToChat(io, socket) {
  chatroomHandler.joinRooms(socket);
  chatroomHandler.enterChatroom(socket);
  chatroomHandler.createChatroom(socket);
  // chatroomHandler.leaveRoom(socket);
  sendMessage(io, socket);
};
