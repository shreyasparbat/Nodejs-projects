const {User} = require('../models/user');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject('User not found');
        } else {
            // Add user data to req and call next() so that program moves forward
            req.user = user;
            req.token = token;
            next();
        }
    }).catch((e) => {
        res.status(401).send(e);
    });
};

module.exports = {
    authenticate
};