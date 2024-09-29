const User = require('../models/userModel');

// Get all users (public or token-protected based on your needs)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['fullName', 'username', 'email', 'dateOfBirth', 'address', 'phoneNumber'] 
        });
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching all users:', err.message);
        res.status(500).json({ error: 'Server error while fetching all users' });
    }
};

// Fetch users for assigning to an activity (minimal details needed)
exports.getUsersForAssignment = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'fullName'] // Only fetch ID and fullName for assignment purposes
        });
        res.json(users);
    } catch (err) {
        console.error('Error fetching users for assignment:', err.message);
        res.status(500).json({ error: 'Server error while fetching users for assignment' });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['fullName', 'username', 'email', 'dateOfBirth', 'address', 'phoneNumber']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(500).json({ error: 'Server error while fetching user profile' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { fullName, username, email, dateOfBirth, address, phoneNumber } = req.body;

        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the username or email is being updated and if it's unique
        if (username && username !== user.username) {
            const existingUserWithUsername = await User.findOne({ where: { username } });
            if (existingUserWithUsername) {
                return res.status(400).json({ error: 'Username already taken' });
            }
            user.username = username;
        }

        if (email && email !== user.email) {
            const existingUserWithEmail = await User.findOne({ where: { email } });
            if (existingUserWithEmail) {
                return res.status(400).json({ error: 'Email already taken' });
            }
            user.email = email;
        }

        // Update other fields if provided
        user.fullName = fullName || user.fullName;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.address = address || user.address;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        // Save the updated user to the database
        await user.save();

        // Return a success response with the updated user data (excluding sensitive information)
        res.json({ message: 'Profile updated successfully', user: { fullName: user.fullName, username: user.username, email: user.email, dateOfBirth: user.dateOfBirth, address: user.address, phoneNumber: user.phoneNumber } });
    } catch (err) {
        console.error('Error updating user profile:', err.message);
        res.status(500).json({ error: 'Server error while updating profile' });
    }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User profile deleted successfully' });
    } catch (err) {
        console.error('Error deleting user profile:', err.message);
        res.status(500).json({ error: 'Server error while deleting profile' });
    }
};
