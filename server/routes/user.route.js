const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

// Get user
router.get('/', UserController.getUser);

// Update user
router.put('/', UserController.updateUser);

// Delete user
router.delete('/', UserController.deleteUser);

// Upload user profile photo
router.post('/upload', UserController.uploadProfilePhoto);

module.exports = router;
