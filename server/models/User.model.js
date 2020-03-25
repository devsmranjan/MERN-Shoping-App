const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const EmailVerificationToken = require('./Email-verification-token.model');
const config = require('../config/key');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: 'Your email is required',
            trim: true
        },

        username: {
            type: String,
            unique: true,
            required: 'Your username is required'
        },

        password: {
            type: String,
            required: 'Your password is required',
            min: 6
        },

        name: {
            type: String,
            required: 'Name is required',
            max: 100
        },

        profileImage: {
            type: String,
            required: false,
            max: 255
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        resetPasswordToken: {
            type: String,
            required: false
        },

        resetPasswordExpires: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true
    }
);

// Convert Password to hash before save
userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

// Check password is correct or not
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// generate JWT token
userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);

    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        name: this.name
    };

    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: '1d'
    });
};

// Generate email verfication token
userSchema.methods.generateEmailVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new EmailVerificationToken(payload);
};

// Generate token and expire time for password reset
userSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model('Users', userSchema);
