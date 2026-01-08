const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const upload = require("../middleware/upload");
const bookCtrl = require("../controllers/bookController");

// Search must come first
router.get("/search", bookCtrl.search);

// Public listing and detail (auth required)
router.get("/", auth, bookCtrl.list);
router.get("/:id", auth, bookCtrl.detail);

// Admin-only CRUD
router.post("/", auth, allowRoles("admin"), bookCtrl.create);
router.put("/:id", auth, allowRoles("admin"), bookCtrl.update);
router.delete("/:id", auth, allowRoles("admin"), bookCtrl.remove);

// Upload book cover image (admin only)
router.put(
  "/:id/image",
  auth,
  allowRoles("admin"),
  upload.single("image"),
  bookCtrl.uploadImage
);

// Rate a book (auth required)
router.post("/:id/rate", auth, bookCtrl.rate);

module.exports = router;
