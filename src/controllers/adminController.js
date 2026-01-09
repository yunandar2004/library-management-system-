const Joi = require("joi");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin"); // make sure Admin.js exports mongoose.models.Admin || mongoose.model("Admin", schema)
const { paginate } = require("../utils/query");

// Current logged-in admin info
exports.me = async (req, res) => {
  res.json({
    message: `You are a ${req.admin.role}`,
    admin: req.admin,
  });
};

// List admins (with pagination and search)
exports.list = async (req, res) => {
  const { page, limit, skip } = paginate(req);
  const query = { role: "admin" }; // always admins
  if (req.query.q) {
    query.$or = [
      { name: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Admin.find(query)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort("-createdAt"),
    Admin.countDocuments(query),
  ]);

  res.json({ items, page, limit, total });
};

// Create admin
exports.create = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin").default("admin"),
    isActive: Joi.boolean().default(true),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    image: Joi.string().allow(""),
    isBanned: Joi.boolean().default(false),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await Admin.findOne({ email: value.email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  // hash password before saving
  value.password = await bcrypt.hash(value.password, 10);

  const admin = await Admin.create(value);
  res.status(201).json({ id: admin._id });
};

// Update admin
exports.update = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    address: Joi.string(),
    isActive: Joi.boolean(),
    image: Joi.string().allow(""),
    isBanned: Joi.boolean(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const admin = await Admin.findByIdAndUpdate(req.params.id, value, { new: true }).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  res.json(admin);
};

// Remove admin
exports.remove = async (req, res) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json({ message: "Deleted" });
};

// Ban / Restore admin
exports.banAdmin = async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true });
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json({ message: "Admin banned successfully", admin });
};

exports.restoreAdmin = async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, { isBanned: false }, { new: true });
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json({ message: "Admin restored successfully", admin });
};

// Edit admin (partial update)
exports.editAdmin = async (req, res) => {
  const updates = {
    name: req.body.name,
    phone: req.body.phone,
    image: req.body.image,
    address: req.body.address,
  };
  const admin = await Admin.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
};

// Change password (self)
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin.id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const match = await bcrypt.compare(oldPassword, admin.password);
  if (!match) return res.status(400).json({ message: "Old password incorrect" });

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  res.json({ message: "Password updated successfully" });
};

// Update profile (self)
exports.updateProfile = async (req, res) => {
  const updates = {
    name: req.body.name,
    phone: req.body.phone,
    image: req.body.image,
    address: req.body.address,
  };
  const admin = await Admin.findByIdAndUpdate(req.admin.id, updates, { new: true }).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
};

// Delete own account (self)
exports.deleteSelf = async (req, res) => {
  const admin = await Admin.findByIdAndDelete(req.admin.id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json({ message: "Account deleted" });
};

// Get admin detail
exports.detail = async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
};

// Current admin
exports.currentAdmin = async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
};
