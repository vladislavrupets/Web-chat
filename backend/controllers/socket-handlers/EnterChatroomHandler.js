const Message = require("../../models/messageModel");
const mongoose = require("mongoose");

module.exports = function enterChatroom(socket) {
  socket?.on("enterChatroom", async function ({ chatroomId, messagesCount }) {
    try {
      const messages = await Message.find({ chatroomId })
        .populate("user", "login")
        .sort({ _id: -1 })
        .skip(messagesCount)
        .limit(50);
      socket.emit("getChatroomMessages", messages);
    } catch (err) {
      console.log(err);
    }
  });
};
