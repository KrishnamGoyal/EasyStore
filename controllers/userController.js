const User = require("../models/user");
const TokenDb = require("../models/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect Password" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const tokenData = new TokenDb({ userId: user._id, token });
    await tokenData.save();

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const userSignup = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const userLogout = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    if (!token) return res.status(400).json({ error: "No token provided" });

    const tokenExists = await TokenDb.findOne({ token });
    if (!tokenExists)
      return res
        .status(400)
        .json({ error: "Invalid token or Session Expired" });

    await TokenDb.deleteOne({ token });
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getAllUsers = async (req, res) => {
  //for testing purposes
  try {
    const usersData = await User.find();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { userLogin, userSignup, getAllUsers, userLogout };
