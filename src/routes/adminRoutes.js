// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');
const adminCtrl = require('../controllers/adminController');

// All routes require admin role
router.use(auth, allowRoles('admin'));

router.get('/users', adminCtrl.listUsers);
router.get('/users/:id', adminCtrl.detailUser);
router.post('/users', adminCtrl.createUser);
router.put('/users/:id', adminCtrl.updateUser);
router.delete('/users/:id', adminCtrl.deleteUser);
router.put('/users/:id/ban', adminCtrl.banUser);

module.exports = router;
