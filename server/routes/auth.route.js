const express = require('express');
const { check } = require('express-validator');

const Auth = require('../controllers/auth.controller')
const Password = require('../controllers/password.controller')

const validate = require('../middlewares/validate.middleware')

const router = express.Router()

// When only auth
router.get('/', (req, res) => {
    res.status(200).json({
        message:
            'You are in the Auth Endpoint. Register or Login to add todos.'
    });
});


// Sign up a new user
router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Enter a valid email address'),
        check('username')
            .not()
            .isEmpty()
            .withMessage('You username is required'),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 6 })
            .withMessage('Must be at least 6 chars long'),
        check('name')
            .not()
            .isEmpty()
            .withMessage('You name is required'),
    ],
    validate,
    Auth.signUp
);

// Login
router.post(
    '/login',
    [
        check('email')
            .isEmail()
            .withMessage('Enter a valid email address'),
        check('password')
            .not()
            .isEmpty()
    ],
    validate,
    Auth.logIn
);

//EMAIL Verification
router.get('/verify/:token', Auth.verifyEmail);
router.post('/resend', Auth.resendEmailVerficationToken);

//Password RESET
// When user click for recover poassword
router.post(
    '/recover',
    [
        check('email')
            .isEmail()
            .withMessage('Enter a valid email address')
    ],
    validate,
    Password.recoverPassword
);

// When user give a get request to the reset link
router.get('/reset/:token', Password.checkResetPasswordLink);

// When user click submit button to update password
router.post(
    '/reset/:token',
    [
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 6 })
            .withMessage('Must be at least 6 chars long'),
        check('confirmPassword', 'Passwords do not match').custom(
            (value, { req }) => value === req.body.password
        )
    ],
    validate,
    Password.resetPassword
);



module.exports = router
