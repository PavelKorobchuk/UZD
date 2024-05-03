const express = require("express");
const router = express.Router();
const { signUp, signIn, refreshToken } = require("../controllers/users");

// Register
router.post("/signup", signUp);
// Login
router.post("/login", signIn);
// Refresh token
router.post('/refresh-token', refreshToken);

module.exports = router;