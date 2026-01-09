const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// Borrow a book
// exports.borrowBook = async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const userId = req.user.id;

//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     const borrowedAt = new Date();

//     const deliveryAt = new Date(borrowedAt);
//     deliveryAt.setDate(deliveryAt.getDate() + 1);

//     const dueAt = new Date(borrowedAt);
//     dueAt.setDate(dueAt.getDate() + 10);

//     const borrow = await Borrow.create({
//       user: userId,
//       book: bookId,
//       borrowedAt,
//       deliveryAt,
//       dueAt,
//       status: "delivering",
//     });

//     res.status(201).json(borrow);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies <= 0)
      return res.status(400).json({ message: "Book not available" });

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
    });

    // 🔥 decrement inventory
    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Return a book
// exports.returnBook = async (req, res) => {
//   try {
//     const { borrowId } = req.params;

//     const borrow = await Borrow.findById(borrowId);
//     if (!borrow) {
//       return res.status(404).json({ message: "Borrow record not found" });
//     }

//     if (borrow.returnedAt) {
//       return res.status(400).json({ message: "Book already returned" });
//     }

//     borrow.returnedAt = new Date();
//     borrow.status = "returned";

//     await borrow.save();

//     res.json(borrow);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const calculateFine = (borrow) => {
  if (borrow.returnedAt) return 0;

  const now = new Date();
  if (now <= borrow.dueAt) return 0;

  const daysLate = Math.ceil((now - borrow.dueAt) / (1000 * 60 * 60 * 24));

  return daysLate * 5; // $5/day
};

exports.returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) return res.status(404).json({ message: "Borrow not found" });

    if (borrow.returnedAt)
      return res.status(400).json({ message: "Already returned" });

    borrow.returnedAt = new Date();
    borrow.fineAmount = calculateFine(borrow);

    await borrow.save();

    // 🔥 increment inventory
    await Book.findByIdAndUpdate(borrow.book, {
      $inc: { availableCopies: 1 },
    });

    res.json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.payFine = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) return res.status(404).json({ message: "Not found" });

    if (borrow.finePaid)
      return res.status(400).json({ message: "Fine already paid" });

    borrow.finePaid = true;
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


exports.list = async (req, res) => {
  const borrows = await Borrow.find()
    .populate("user")
    .populate("book");

  res.json(borrows);
};
