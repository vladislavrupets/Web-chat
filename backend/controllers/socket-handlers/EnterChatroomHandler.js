const Message = require("../../models/messageModel");
const mongoose = require("mongoose");

module.exports = function enterChatroom(socket) {
  socket?.on("enterChatroom", async function ({ chatroomId }) {
    try {
      const messages = await Message.find({ chatroomId }).populate(
        "user",
        "login"
      );
      socket.emit("getChatroomMessages", messages);
    } catch (err) {
      console.log(err);
    }
  });
};
