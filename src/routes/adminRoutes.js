const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // authentication middleware
const allowRoles = require("../middleware/roles"); // role-based access
const adminCtrl = require("../controllers/adminController");

// --------------------
// Self (current admin)
// --------------------
router.get("/me", auth, allowRoles("admin"), adminCtrl.me);
router.get("/current", auth, allowRoles("admin"), adminCtrl.currentAdmin);
router.put("/me/password", auth, allowRoles("admin"), adminCtrl.changePassword);
router.put("/me/profile", auth, allowRoles("admin"), adminCtrl.updateProfile);
router.delete("/me", auth, allowRoles("admin"), adminCtrl.deleteSelf);

// --------------------
// Admin management (CRUD + search)
// --------------------
router.get("/", auth, allowRoles("admin"), adminCtrl.list); // list admins with search + pagination
router.post("/", auth, allowRoles("admin"), adminCtrl.create); // create admin
router.get("/:id", auth, allowRoles("admin"), adminCtrl.detail); // view single admin
router.put("/:id", auth, allowRoles("admin"), adminCtrl.update); // update admin
router.delete("/:id", auth, allowRoles("admin"), adminCtrl.remove); // delete admin

// --------------------
// Ban / Restore
// --------------------
router.put("/:id/ban", auth, allowRoles("admin"), adminCtrl.banAdmin);
router.put("/:id/restore", auth, allowRoles("admin"), adminCtrl.restoreAdmin);

// --------------------
// Edit admin (partial update)
// --------------------
router.put("/:id/edit", auth, allowRoles("admin"), adminCtrl.editAdmin);

module.exports = router;
