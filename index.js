const express = require("express");
const connectDB = require("./config/database");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello this is the initial page!</h1>");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, console.log(`Connected and listening at ${PORT}`));
  } catch (error) {
    console.log("Port Could not be Opened");
    console.log(error);
  }
};

start();
