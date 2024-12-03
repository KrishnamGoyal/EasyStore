const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    mongoose.connect(url);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Could not Connect ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
