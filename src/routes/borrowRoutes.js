// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const borrowCtrl = require("../controllers/borrowController");

// // // Borrow a book
// // router.post("/:bookId/borrow", auth, borrowCtrl.borrowBook);

// // // Return a book
// // router.put("/:borrowId/return", auth, borrowCtrl.returnBook);

// // // List all borrows
// // router.get("/", auth, borrowCtrl.list);

// // // Get borrow detail
// // router.get("/:id", auth, borrowCtrl.detail);

// // module.exports = router;

// router.post("/:bookId/borrow", auth, borrowCtrl.borrowBook);
// router.put("/:borrowId/return", auth, borrowCtrl.returnBook);
// router.put("/:borrowId/pay-fine", auth, borrowCtrl.payFine);

// router.get("/", auth, borrowCtrl.list);
// router.get("/:id", auth, borrowCtrl.detail);

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const borrowCtrl = require("../controllers/borrowController");

// Borrow a book
router.post("/:bookId/borrow", auth, borrowCtrl.borrowBook);

// Return a book
router.put("/:borrowId/return", auth, borrowCtrl.returnBook);

// Pay fine
router.put("/:borrowId/pay-fine", auth, borrowCtrl.payFine);

// List all borrows
router.get("/", auth, borrowCtrl.list);

// Get borrow detail
router.get("/:id", auth, borrowCtrl.detail);

module.exports = router; // ✅ don’t forget this
