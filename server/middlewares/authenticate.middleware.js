const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Access - No Token Provided!'
            });
        }

        req.user = {
            _id: user._id,
            email: user.email,
            username: user.username,
            name: user.name,
            profileImage: user.profileImage
        };

        next();
    })(req, res, next);
};
