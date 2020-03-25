const config = require('../config/key');
const User = require('../models/User.model');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

// When user click for recover poassword
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    'The email address ' +
                    email +
                    ' is not associated with any account. Double-check your email address and try again.'
            });
        }

        user.generatePasswordReset();

        // Save upadted user object
        await user.save();

        // send email
        let passwordResetLink =
            req.protocol +
            '://' +
            req.headers.host +
            '/api/auth/reset/' +
            user.resetPasswordToken;

        const mailOptions = {
            to: user.email,
            from: config.SENDGRID_FROM_EMAIL,
            subject: 'Password change request',
            text: `Hi ${user.username} \n\nPlease click on the following link ${passwordResetLink} to reset your password. \n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await sgMail.send(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'A reset email has been sent to ' + user.email + '.'
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// When user give a get request to the reset link
exports.checkResetPasswordLink = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user)
            return res.status(401).json({
                success: false,
                message: 'Password reset token is invalid or has expired.'
            });

        //Redirect user to form with the email address
        res.render('reset', { user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// When user click submit button to update password
exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Password reset token is invalid or has expired.'
            });
        }

        //Set the new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;

        await user.save();
        // send email
        const mailOptions = {
            to: user.email,
            from: config.SENDGRID_FROM_EMAIL,
            subject: 'Your password has been changed',
            text: `Hi ${user.username} \n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
        };

        sgMail.send(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Your password has been updated.'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
