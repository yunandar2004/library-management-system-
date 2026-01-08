// src/controllers/adminController.js
const Joi = require('joi');
const User = require('../models/User');

// List all users (admin only)
exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// View single user detail
exports.detailUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Create new user (admin can create admin or user)
exports.createUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user').default('user'),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await User.findOne({ email: value.email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });

  const user = await User.create(value);
  res.status(201).json({ message: 'User created', id: user._id });
};

// Update user
exports.updateUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    role: Joi.string().valid('admin', 'user'),
    isActive: Joi.boolean(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findByIdAndUpdate(req.params.id, value, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Delete user
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};

// Ban user
exports.banUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User banned', user });
};
