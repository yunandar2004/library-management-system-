const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const userCtrl = require("../controllers/userController");
const upload = require("../middleware/upload");
const User = require("../models/User"); // ✅ FIXED

// Get current logged-in user
router.get("/me", auth, userCtrl.currentUser);

// Role tests
router.get("/admin-only", auth, allowRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/user-only", auth, allowRoles("user"), (req, res) => {
  res.json({ message: "Welcome User!" });
});

// Self routes
router.get("/me", auth, userCtrl.me);
router.put("/me/password", auth, userCtrl.changePassword);
router.put("/me/profile", auth, userCtrl.updateProfile);
router.delete("/me", auth, userCtrl.deleteSelf);

// Admin routes
router.get("/", auth, allowRoles("admin"), userCtrl.list);
router.post("/", auth, allowRoles("admin"), userCtrl.create);
router.get("/:id", auth, allowRoles("admin"), userCtrl.detail); // 👈 ADD THIS
router.put("/:id", auth, allowRoles("admin"), userCtrl.update);
router.delete("/:id", auth, allowRoles("admin"), userCtrl.remove); // ✅ FIXED

router.put("/:id/ban", auth, allowRoles("admin"), userCtrl.banUser);
router.put("/:id/edit", auth, allowRoles("admin"), userCtrl.editUser);

// Upload profile image (self)
router.put("/me/image", auth, upload.single("image"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { image: `/uploads/${req.file.filename}` },
    { new: true }
  );
  res.json(user);
});




module.exports = router;
