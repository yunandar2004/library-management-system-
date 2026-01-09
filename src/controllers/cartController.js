// controllers/cartController.js
const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

exports.checkoutCart = async (req, res) => {
  try {
    const { items } = req.body; // items = [{ bookId, qty }]
    const userId = req.user.id;
    const borrowedItems = [];

    for (const item of items) {
      const book = await Book.findById(item.bookId);
      if (!book || book.availableCopies < item.qty)
        return res.status(400).json({ message: `${book?.title || "Book"} not available` });

      for (let i = 0; i < item.qty; i++) {
        const borrowedAt = new Date();
        const deliveryAt = new Date(borrowedAt);
        deliveryAt.setDate(deliveryAt.getDate() + 1);

        const dueAt = new Date(borrowedAt);
        dueAt.setDate(dueAt.getDate() + 10);

        const borrow = await Borrow.create({
          user: userId,
          book: item.bookId,
          borrowedAt,
          deliveryAt,
          dueAt,
        });

        borrowedItems.push(borrow);
      }

      // Decrease inventory
      book.availableCopies -= item.qty;
      await book.save();
    }

    res.status(201).json({ borrowedItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};