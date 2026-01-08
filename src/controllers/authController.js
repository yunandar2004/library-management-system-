// src/controllers/authController.js
const User = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Normal user registration
exports.register = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await User.findOne({ email: value.email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ ...value, role: 'user' });
  res.status(201).json({ message: 'User registered successfully', user });
};

// Admin registration (admin-only route)
exports.registerAdmin = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await User.findOne({ email: value.email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const admin = await User.create({ ...value, role: 'admin' });
  res.status(201).json({ message: 'Admin registered successfully', admin });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  // ✅ token is created here, where user is defined
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, user });
};

// Logout (simple)
exports.logout = async (req, res) => {
  res.json({ message: 'Logged out successfully. Clear token on client.' });
};
