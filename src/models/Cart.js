// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
      name: { type: String, required: true },   // ✅ book name
      image: { type: String, default: "" },     // ✅ book image
      price: { type: Number, required: true },  // ✅ price per unit
      qty: { type: Number, default: 1 },        // ✅ quantity
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
