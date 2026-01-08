const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const borrowCtrl = require("../controllers/borrowController");

// Borrow a book
router.post("/:bookId/borrow", auth, borrowCtrl.borrowBook);

// Return a book
router.put("/:borrowId/return", auth, borrowCtrl.returnBook);

// List all borrows
router.get("/", auth, borrowCtrl.list);

// Get borrow detail
router.get("/:id", auth, borrowCtrl.detail);

module.exports = router;
