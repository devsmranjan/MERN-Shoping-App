const config = require('../config/key')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

const User = require('../models/User.model');
const EmailVerificationToken = require('../models/Email-verification-token.model');

// Sign Up
exports.signUp = async (req, res) => {
    try {
        const { email, username } = req.body;

        // check account is exist or not
        const userByEmail = await User.findOne({ email });

        if (userByEmail) {
            return res.status(401).json({
                success: false,
                message:
                    'The email address you have entered is already associated with another account.'
            });
        }

        const userByUsername = await User.findOne({ username });

        if (userByUsername) {
            return res.status(401).json({
                success: false,
                message:
                    'The username you have entered is already associated with another account.'
            });
        }

        const newUser = await new User({ ...req.body }).save();
        sendEmail(newUser, req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// login
exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check account is exist or not
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' });
        }

        //validate password
        if (!user.comparePassword(password))
            return res
                .status(401)
                .json({ success: false, message: 'Invalid email or password' });

        // Make sure the user has been verified
        if (!user.isVerified)
            return res.status(401).json({
                type: 'not-verified',
                success: false,
                message: 'Your account has not been verified.'
            });

        // Login successful, write token, and send back user
        return res.status(200).json({
            success: true,
            token: user.generateJWT(),
            user: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
    if (!req.params.token) {
        return res.status(400).json({
            success: false,
            message: 'Sorry! We were unable to process your verfication.'
        });
    }

    try {
        // Find a matching token
        const token = await EmailVerificationToken.findOne({
            token: req.params.token
        });

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Sorry! We were unable to process your verfication.'
            });
        }

        const user = await User.findOne({ _id: token.userId });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Sorry! We were unable to process your verfication.'
            });
        }

        // Check whether the user already verified or not
        if (user.isVerified)
            return res.status(400).json({
                success: false,
                message: 'This user has already been verified.'
            });

        // Verify and save the user
        user.isVerified = true;
        await user.save();

        res.status(200).send('The account has been verified. Please log in.');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Resend email Verification token
exports.resendEmailVerficationToken = async (req, res) => {
    try {
        const { email } = req.body;

        // Check user available or not
        const user = await User.findOne({ email });

        // If user not available
        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    'The email address ' +
                    req.body.email +
                    ' is not associated with any account. Double-check your email address and try again.'
            });
        }

        // If user has already been verified
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message:
                    'This account has already been verified. Please log in.'
            });
        }

        // Else send mail with verification link
        sendEmail(user, req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Send mail with verfication link
const sendEmail = async (user, req, res) => {
    const emailVerficationToken = user.generateEmailVerificationToken();

    // Save the verfication token
    try {
        await emailVerficationToken.save();

        const verficationURL =
            req.protocol +
            '://' +
            req.headers.host +
            '/api/auth/verify/' +
            emailVerficationToken.token;

        const mailOptions = {
            to: user.email,
            from: config.SENDGRID_FROM_EMAIL,
            subject: 'Account Verification Token',
            text: `Hi ${user.username}\n\nPlease click on the following link ${verficationURL} to verify your account.\n\nIf you did not request this, please ignore this email.\n`
        };

        await sgMail.send(mailOptions);
        return res.status(200).json({
            success: true,
            message: 'A verification email has been sent to ' + user.email + '.'
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
