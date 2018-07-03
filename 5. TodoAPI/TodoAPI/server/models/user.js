const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
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

// Override toJson
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
};

// Generate Authentication tokens
UserSchema.methods.generateAuthToken = function () {
    // Create token
    const user = this;
    const access = 'auth'; // to specify the type of token
    const token = jwt.sign({
        _id: user._id,
        access
    }, 'someSecretSalt');

    // Save token (using concat instead of push)
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    })
};

// Find user by token
UserSchema.statics.findByToken = function (token) {
      const User = this;
      var decoded;

      // Verify token
      try {
          decoded = jwt.verify(token, 'someSecretSalt');
      } catch (e) {
          return Promise.reject(e);
      }

      return User.findOne({
          _id: decoded._id,
          'tokens.token': token,
          'tokens.access': 'auth'
      })
};

// Add password hashing middleware
UserSchema.pre('save', function (next) {
    const user = this;

    // Check if password has already been hashed
    if (!user.isModified('password')) {
        // Generate salt and hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                // Update document
                user.password = hash;
                next();
            });
        });
    } else {
        next()
    }
});

// Create model and export
const User = mongoose.model('User', UserSchema);
module.exports = {User};