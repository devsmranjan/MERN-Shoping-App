const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const cloudinary = require('../config/cloudinary');

const User = require('../models/User.model');

multer_upload = multer().single('profileImage');

// Get user
exports.getUser = async (req, res) => {
    try {
        const { user } = req;

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const updateData = req.body;

        const { user } = req;

        await User.updateOne({ _id: user._id }, updateData);

        return res.status(200).json({
            success: true,
            message: 'User has been updated'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { user } = req;

        await User.deleteOne({
            _id: user._id
        });

        res.status(200).json({
            success: true,
            message: 'User has been deleted'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Upload Profile Photo
exports.uploadProfilePhoto = (req, res) => {
    try {
        multer_upload(req, res, function(err) {
            if (err) return res
                         .status(500)
                         .json({ success: false, error: err.message });

            const { _id } = req.user;
            const dUri = new Datauri();
            let image = dUri.format(
                path.extname(req.file.originalname).toString(),
                req.file.buffer
            );

            cloudinary.uploader
                .upload(image.content)
                .then(result =>
                    User.findByIdAndUpdate(
                        _id,
                        { profileImage: result.url },
                        { new: true }
                    )
                )
                .then(user => res.status(200).json({ user }))
                .catch(error =>
                    res
                        .status(500)
                        .json({ success: false, message: error.message })
                );
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
