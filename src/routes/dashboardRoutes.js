// src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');
const dashCtrl = require('../controllers/dashboardController');

router.get('/admin', auth, allowRoles('admin'), dashCtrl.adminDashboard);
router.get('/user', auth, dashCtrl.userHome);

module.exports = router;
