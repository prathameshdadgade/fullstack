const express = require('express');
const { protect, isAdmin } = require('../middleware/auth');
const { getAllUsers } = require('../controllers/adminController');
const router = express.Router();

router.get('/users', protect, isAdmin, getAllUsers);

module.exports = router;
