const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token type' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user details to request object
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: 'Invalid token' });
        } else {
            return res.status(400).json({ error: 'Token verification failed' });
        }
    }
};
