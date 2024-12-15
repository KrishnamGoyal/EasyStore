const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Admin route only
const addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  try {
    if (!name || !description || !price || !category || !stock)
      return res.status(500).json("All fields required");
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
    });
    await product.save();
    res.status(201).json({ message: "Product added Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ error: "Id required" });
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(400).json({ error: "Product Not found" });
    res.status(200).json({ message: "Product deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    if (!id) return res.status(400).json({ error: "Id required" });
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(400).json({ error: "Product Not found" });
    res.status(200).json({ message: "Product Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({}).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    console.log(totalProducts);
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getProductbyId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ error: "Id required" });
    const product = await Product.findById(id);
    if (!product) return res.status(400).json({ error: "Product Not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = {
  getProducts,
  getProductbyId,
  addProduct,
  deleteProduct,
  updateProduct,
};
