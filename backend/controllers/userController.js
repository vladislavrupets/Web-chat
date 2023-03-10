const User = require("../models/userModel");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

module.exports.register = async function (req, res) {
  try {
    const { login, password } = req.body;
    const user = {
      login,
      password: sha256(password + process.env.SALT),
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
