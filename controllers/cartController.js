const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cart = require("../models/cart");
const product = require("../models/product");
require("dotenv").config();

const addtoCart = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(req, req.user);
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) cart.products[productIndex] += quantity;
      else cart.products.push({ productId, quantity });

      await cart.save();
      res.status(200).json({ message: "Cart Updated", cart });
    } else {
      const newCart = new Cart({
        userId: req.user.id,
        products: [{ productId, quantity }],
      });
      await newCart.save();
      res.status(200).json({ message: "Product Added to Cart", cart });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    if (!cart) return res.status(400).json({ error: "Cart Not found" });

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Cart item updated", cart });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const deletefromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { addtoCart, getCart, updateCartItem, deletefromCart };
