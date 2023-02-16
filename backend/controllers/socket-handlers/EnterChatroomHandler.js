const Message = require("../../models/messageModel");
const mongoose = require("mongoose");

module.exports = function enterChatroom(socket) {
  socket?.on("enterChatroom", async function ({ chatroomId, messagesCount }) {
    try {
      const messages = await Message.find({ chatroomId })
        .populate("user", "login")
        .sort({ _id: -1 })
        .skip(messagesCount)
        .limit(30);
      let mes = messages.reverse();
      socket.emit("getChatroomMessages", mes, (res) => {
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
