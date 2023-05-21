const User = require("../models/userModel");
const Chatroom = require("../models/chatroomModel");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

module.exports.register = async function (req, res) {
  try {
    const { login, password } = req.body;

    //for test
    const chatrooms = await Chatroom.find({
      roomName: { $in: ["test1", "test2"] },
    });
    const chatroomsList = chatrooms.map((room) => room._id);

    const user = {
      login,
      password: sha256(password + process.env.SALT),
      chatroomsList, //for test
    };

    if (await User.findOne({ login })) {
      throw "A user with the same login already exists.";
    }

    await User.create(user);

    res.json({
      message: "User " + login + " registered successfully.",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.login = async function (req, res) {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({
      login,
      password: sha256(password + process.env.SALT),
    });
    let token;

    if (!user) {
      throw "Login or password did not match.";
    }

    token = await jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({
      message: "Logged in successfully.",
      token,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
