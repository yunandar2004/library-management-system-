// src/controllers/dashboardController.js
const User = require('../models/User.js');
const Book = require('../models/Book');
const Borrow = require('../models/Borrow');

exports.adminDashboard = async (req, res) => {
  const [users, books, borrowed, overdue] = await Promise.all([
    User.countDocuments({}),
    Book.countDocuments({}),
    Borrow.countDocuments({ status: 'borrowed' }),
    Borrow.countDocuments({ status: 'overdue' }),
  ]);
  res.json({ users, books, borrowed, overdue });
};

exports.userHome = async (req, res) => {
  const [borrowed, returned, overdue] = await Promise.all([
    Borrow.countDocuments({ user: req.user.id, status: 'borrowed' }),
    Borrow.countDocuments({ user: req.user.id, status: 'returned' }),
    Borrow.countDocuments({ user: req.user.id, status: 'overdue' }),
  ]);
  res.json({ borrowed, returned, overdue });
};
