const express = require('express');

const authController = require('./auth.controller');

const router = express.Router();

router.get('/users', authController.getUsers);
router.put('/users/:id', authController.updateUser);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);
router.get('/get-users-by-email/:email', authController.getUsersByEmail);

module.exports = router;
