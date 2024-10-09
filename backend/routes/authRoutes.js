const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware'); 

// Public routes (login and register)
router.post('/register', register);
router.post('/login', login);

// Example protected route (You can add more protected routes like this)
router.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the dashboard!' });
});

module.exports = router;
