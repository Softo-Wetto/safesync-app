const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');

// Protected route to get user profile
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;
