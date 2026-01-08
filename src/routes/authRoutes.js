// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

// Public registration (always role=user)
router.post('/register', authCtrl.register);

// Admin-only registration
router.post('/register-admin', auth, allowRoles('admin'), authCtrl.registerAdmin);

// Login/logout
router.post('/login', authCtrl.login);
router.post('/logout', auth, authCtrl.logout);

module.exports = router;
