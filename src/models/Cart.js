// models/Cart.js
const mongoose = require("mongoose");
// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        name: { type: String, required: true }, // ✅ book name
        image: { type: String, default: "" }, // ✅ book image
        price: { type: Number, required: true }, // ✅ price per unit
        qty: { type: Number, default: 1 }, // ✅ quantity
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
// src/models/Cart.js

// const cartSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [
//       {
//         bookId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Book",
//           required: true,
//         },
//         name: String,
//         image: String,
//         price: Number,
//         qty: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Cart", cartSchema);

// Add to cart
router.post("/add", auth, async (req, res) => {
  const { bookId, name, image, price, qty } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.bookId.toString() === bookId
  );

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

  cart.items = cart.items.filter(
    (item) => item.bookId.toString() !== req.params.bookId
  );
  await cart.save();

  const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
  res.json({ cart, count });
});

// router.post("/checkout", auth, cartCtrl.checkoutCart);
