const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile, deleteUserProfile, getAllUsers, getUsersForAssignment } = require('../controllers/userController');

// Protected routes
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.delete('/profile', verifyToken, deleteUserProfile);

// Route to get all users (for user management or profile purposes)
router.get('/all', getAllUsers);

// Route to get users for assigning to activities
router.get('/for-assignment', getUsersForAssignment);

module.exports = router;
