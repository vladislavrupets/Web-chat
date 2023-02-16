const Message = require("../../models/messageModel");
const User = require("../../models/userModel");
const getMessageDate = require("../../utilities/UnixDateToUserDate");
const mongoose = require("mongoose");
const generateUniqueId = require("generate-unique-id");
const { login } = require("../userController");

module.exports = function sendMessage(io, socket) {
  socket?.on("sendMessage", async ({ chatroomId, message }) => {
    try {
      const user = await User.findOne({ _id: socket.userId });
      const sendDate = getMessageDate(new Date(Date.now()));
      io.in(chatroomId).emit("receiveMessage", {
        _id: generateUniqueId(8),
        user: {
          _id: socket.userId,
          login: user.login,
        },
        messageText: message,
        sendDate,
        chatroomId,
      });
      await Message.create({
        user: mongoose.Types.ObjectId(socket.userId),
        chatroomId,
        messageText: message,
        sendDate,
      });
    } catch (e) {
      console.log(e);
    }
  });
};
