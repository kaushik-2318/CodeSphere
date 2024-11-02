const express = require("express");
const isAuthenticated = require("../middleware/auth.middleware");
const { sendEmailOtp } = require("../controllers/emailotp.controller");
const { verifyEmailOtp } = require("../controllers/verifyEmailOtp.controller");
const router = express.Router();

router.post("/sendemailotp", isAuthenticated, sendEmailOtp);
router.post("/getemailotp", isAuthenticated, verifyEmailOtp);
router.post("/number");

module.exports = router;
