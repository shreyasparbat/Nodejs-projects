const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: false,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function () {
    // Create token
    const user = this;
    var access = 'auth'; // to specify the type of token
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'someSecretSalt');

    // Save token (using concat instead of push)
    user.tokens = user.tokens.concat([{access, token}]);
    user.save().then(() => {
        return token;
    })
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};