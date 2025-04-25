const express = require('express');
const { protect } = require('../middleware/auth');
const { getProfile } = require('../controllers/userController');
const router = express.Router();

router.get('/me', protect, getProfile);


module.exports = router;
