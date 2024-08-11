const express = require('express');
const { register, verifyOtp, resendOtp } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);

module.exports = router;
