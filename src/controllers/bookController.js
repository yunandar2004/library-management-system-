const Joi = require("joi");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const { buildQuery, paginate } = require("../utils/query");

/* ======================================================
   LIST BOOKS (pagination + filters + search)
====================================================== */
exports.list = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req);

    const filters = {
      category: req.query.category,
      publishedYear: req.query.publishedYear,
    };

    const query = buildQuery({
      q: req.query.q,
      filters,
      fields: ["title", "author", "category", "tags"],
    });

    const [items, total] = await Promise.all([
      Book.find(query).skip(skip).limit(limit).sort("-createdAt"),
      Book.countDocuments(query),
    ]);

    res.json({ items, page, limit, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   GET BOOK DETAIL
====================================================== */
exports.detail = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   CREATE BOOK
====================================================== */
exports.create = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().trim(),
      author: Joi.string().trim(),
      isbn: Joi.string().allow(""),
      category: Joi.string().allow(""),
      publishedYear: Joi.number().integer(),
      totalCopies: Joi.number().integer().min(0),
      availableCopies: Joi.number().integer().min(0),
      borrowPrice: Joi.number().min(0),
      description: Joi.string().allow(""),
      tags: Joi.array().items(Joi.string()),
      image: Joi.string()
        .custom((value, helpers) => {
          if (!value) return value; // allow empty string
          // allow full URL
          if (/^https?:\/\/.+\..+/.test(value)) return value;
          // allow filename with png/jpg/jpeg
          if (/^[\w,\s-]+\.(png|jpg|jpeg)$/i.test(value)) return value;
          return helpers.error("any.invalid");
        }, "Image validation")
        .allow(""),

      rating: Joi.number().min(0).max(5), // ✅ allow rating
      ratingCount: Joi.number().integer().min(0), // ✅ allow ratingCount
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((d) => d.message).join(", "),
      });
    }

    const book = await Book.create(value);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // req.file contains the uploaded image
    book.image = req.file.buffer; // or save path if using diskStorage
    await book.save();

    res.json({ message: "Image uploaded successfully", book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   UPDATE BOOK
====================================================== */
exports.update = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().trim(),
      author: Joi.string().trim(),
      isbn: Joi.string().allow(""),
      category: Joi.string().allow(""),
      publishedYear: Joi.number().integer(),
      totalCopies: Joi.number().integer().min(0),
      availableCopies: Joi.number().integer().min(0),
      borrowPrice: Joi.number().min(0),
      description: Joi.string().allow(""),
      tags: Joi.array().items(Joi.string()),
      image: Joi.string().uri().allow(""),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((d) => d.message).join(", "),
      });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// src/controllers/bookController.js
exports.update = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   DELETE BOOK
====================================================== */
exports.remove = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   SEARCH BOOKS
====================================================== */
exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query required" });
    }

    const regex = new RegExp(q, "i");

    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { category: regex },
        { tags: regex },
      ],
    });

    res.json({ items: books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   RATE BOOK (USER ACTION)
====================================================== */
exports.rate = async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.rating =
      (book.rating * book.ratingCount + rating) / (book.ratingCount + 1);

    book.ratingCount += 1;

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
