const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chatroomsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatroom",
      required: false,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
