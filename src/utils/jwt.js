const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-secret-key';

function generateToken(payload, expiresIn = '15m') {
    return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken,
};