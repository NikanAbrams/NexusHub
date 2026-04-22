// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No access pass found. Please login.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // Pass is valid, proceed to the API window
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Access pass is invalid or expired.' });
    }
};
