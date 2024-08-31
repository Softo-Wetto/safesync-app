const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');

// Protected routes
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile); 
router.delete('/profile', verifyToken, deleteUserProfile); 

module.exports = router;
