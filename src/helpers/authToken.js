require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
// const { User } = require('../database/models');

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
         jwt.verify(token, secret);
        // const user = await User.findOne({ where: { username: payload.data.username } });
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return next();
};

module.exports = verifyJWT;