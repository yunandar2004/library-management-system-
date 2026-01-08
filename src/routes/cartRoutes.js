// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");

// Add to cart
router.post("/add", auth, async (req, res) => {
  const { bookId, name, image, price, qty } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.bookId.toString() === bookId);

  if (existingItem) {
    existingItem.qty += qty; // increase quantity if already in cart
  } else {
    cart.items.push({ bookId, name, image, price, qty });
  }

  await cart.save();

  const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
  res.json({ cart, count });
});

// Get cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  const count = cart ? cart.items.reduce((sum, item) => sum + item.qty, 0) : 0;
  res.json({ cart: cart || { items: [] }, count });
});

// Remove item
router.delete("/:bookId", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.bookId.toString() !== req.params.bookId);
  await cart.save();

  const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
  res.json({ cart, count });
});

module.exports = router;
