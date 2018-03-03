var jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV || 'dev';
var config = require('../../config')[env];

// Middleware to authenticate users by verifying tokens:
module.exports = (req, res, next) => {
    let token = req.headers.token;

    if (!token) {
        res.status(403).json({ message: 'No token provided.' });
    } else {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(403).json({error: "Token invalid."});
            } else {
                next();
            }
        });
    }
};
