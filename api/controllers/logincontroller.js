var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'dev';
var jwt = require('jsonwebtoken');
var config = require('../../config')[env];
var User = require('../models/user');

exports.login = (req, res) => {
    console.log(config);
    var loginInfo = { name: req.headers.name, password: req.headers.password };

    User.findOne({ name: loginInfo.name, password: loginInfo.password }, (err, user) => {
        if (err) {
            res.status(500).send({ error: 'Internal API error.' });
        } else if (!user) {
            res.status(403).send({ error: 'Username or password wrong.' });
        } else {
            jwt.sign({ user: user.name }, config.jwtSecret , { expiresIn: '1h' }, (err, result) => {
                if (err) {
                    res.status(500).send({ error: 'Internal API error.' });
                } else {
                    res.send({ token: result });
                }
            });
        }
    })
};
