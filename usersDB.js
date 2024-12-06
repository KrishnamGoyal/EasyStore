require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/database");

const User = require("./models/user");
const usersData = require("./users");

const connection = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await User.deleteMany();
    // await User.create(usersData);
    // console.log(usersData);
    mongoose.disconnect();
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

connection();
