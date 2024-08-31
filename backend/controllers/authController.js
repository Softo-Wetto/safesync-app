const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
    const { fullName, username, email, dateOfBirth, address, phoneNumber, password } = req.body;

    try {
        // Check if user already exists by email or username
        const existingEmail = await User.findOne({ where: { email } });
        const existingUsername = await User.findOne({ where: { username } });

        if (existingEmail) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        if (existingUsername) {
            return res.status(400).json({ error: 'User with this username already exists' });
        }

        // Create a new user
        const user = await User.create({
            fullName,
            username,
            email,
            dateOfBirth,
            address,
            phoneNumber,
            password
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Database error during registration:', err);
        res.status(500).json({ error: 'Database error during registration' });
    }
};

// Login a user using email
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
            message: 'Login successful', 
            token,
            username: user.username  // Include the username in the response
        });
    } catch (err) {
        console.error('Database error during login:', err);
        res.status(500).json({ error: 'Database error during login' });
    }
};
