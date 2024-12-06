require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/database");

const Product = require("./models/product");
const productsData = require("./products.json");

const connection = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(productsData);
    // console.log(productsData);
    mongoose.disconnect();
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

connection();
