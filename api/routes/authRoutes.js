const express = require('express');
const router = express.Router();
const {LoginUser, registerUser, verifyToken} = require("../controllers/authControllers")

// User Registration
router.post('/register',registerUser);

// User Login
router.post('/login',LoginUser);

// Verify Token
router.get('/verify',verifyToken);

module.exports = router;