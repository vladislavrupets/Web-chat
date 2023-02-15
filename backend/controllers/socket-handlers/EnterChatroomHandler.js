const Message = require("../../models/messageModel");
const mongoose = require("mongoose");

module.exports = function enterChatroom(socket) {
  socket?.on("enterChatroom", async function ({ chatroomId, messagesCount }) {
    try {
      const messages = await Message.find({ chatroomId })
        .populate("user", "login")
        .sort({ _id: -1 })
        .skip(messagesCount)
        .limit(10);
      let mes = messages.reverse();
      console.log("bebra" + messagesCount);
      console.log(mes.length);
      socket.emit("getChatroomMessages", mes);
    } catch (err) {
      console.log(err);
    }
  });
};
