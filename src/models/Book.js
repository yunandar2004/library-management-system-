// src/models/Book.js

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, unique: true, sparse: true },
    category: { type: String, index: true },
    publishedYear: { type: Number },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, required: true, min: 0 },
    borrowPrice: { type: Number, required: true, min: 0 },
    description: { type: String },
    tags: [{ type: String, index: true }],
    image: { type: String, default: "" },
    rating: { type: Number, default: 4.5 }, // average rating
    ratingCount: { type: Number, default: 30 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
