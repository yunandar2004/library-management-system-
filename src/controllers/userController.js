// src/controllers/userController.js
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { paginate } = require("../utils/query");

// Current logged-in user info
exports.me = async (req, res) => {
  res.json({
    message: `You are a ${req.user.role}`,
    user: req.user,
  });
};

// List users (admin only, with pagination and search)
exports.list = async (req, res) => {
  const { page, limit, skip } = paginate(req);
  const query = {};
  if (req.query.role) query.role = req.query.role;
  if (req.query.q) {
    query.$or = [
      { name: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    User.find(query)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort("-createdAt"),
    User.countDocuments(query),
  ]);

  res.json({ items, page, limit, total });
};

// Create user (admin only)
exports.create = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "user").default("user"),
    isActive: Joi.boolean().default(true),
    phone: Joi.string().optional(),
    image: Joi.string().uri().allow(""),
    isBanned: Joi.boolean().default(false),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await User.findOne({ email: value.email });
  if (exists)
    return res.status(409).json({ message: "Email already registered" });

  const user = await User.create(value);
  res.status(201).json({ id: user._id });
};

// Update user (admin only)
exports.update = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(), // ✅ allow email
    role: Joi.string().valid("admin", "user"),
    phone: Joi.string().optional(),
    isActive: Joi.boolean(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findByIdAndUpdate(req.params.id, value, {
    new: true,
  }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// Remove user (admin only)
exports.remove = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Deleted" });
};

// Ban user (admin only)
// exports.banUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { isBanned: true },
//       { new: true }
//     );
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User banned successfully", user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.restoreUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { isBanned: false },
//       { new: true }
//     );
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User restored successfully", user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: true, isActive: false }, // ✅ ban + deactivate
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User banned successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Restore user
exports.restoreUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: false, isActive: true }, // ✅ restore + activate
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User restored successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit user (admin only)
exports.editUser = async (req, res) => {
  const updates = {
    name: req.body.name,
    phone: req.body.phone,
    image: req.body.image, // use `image` instead of `profile`
  };
  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Change password (self)
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await user.comparePassword(oldPassword);
  if (!match)
    return res.status(400).json({ message: "Old password incorrect" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated successfully" });
};

// Update profile (self)
exports.updateProfile = async (req, res) => {
  const updates = {
    name: req.body.name,
    phone: req.body.phone,
    image: req.body.image,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Delete own account (self)
exports.deleteSelf = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Account deleted" });
};

// Get user detail (admin only)
exports.detail = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// src/controllers/userController.js
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // don't send password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
