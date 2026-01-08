const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const borrowedAt = new Date();

    const deliveryAt = new Date(borrowedAt);
    deliveryAt.setDate(deliveryAt.getDate() + 1);

    const dueAt = new Date(borrowedAt);
    dueAt.setDate(dueAt.getDate() + 10);

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      borrowedAt,
      deliveryAt,
      dueAt,
      status: "delivering",
    });

    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    if (borrow.returnedAt) {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrow.returnedAt = new Date();
    borrow.status = "returned";

    await borrow.save();

    res.json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all borrows
exports.list = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate("user", "name email")
      .populate("book", "title author")
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get borrow detail
exports.detail = async (req, res) => {
  try {
    const { id } = req.params;

    const borrow = await Borrow.findById(id)
      .populate("user", "name email")
      .populate("book", "title author");

    if (!borrow) {
      return res.status(404).json({ message: "Borrow not found" });
    }

    res.json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
