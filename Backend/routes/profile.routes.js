const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/getProfile.controller.js");
const { getUserProfile } = require("../controllers/getUserProfile.controller.js")
const { updateProfile } = require("../controllers/profileUpdate.controller");
const upload = require("../config/multer.config");
const isAuthenticated = require("../middleware/auth.middleware.js");

router.get("/", isAuthenticated, getProfile);
router.put("/update", isAuthenticated, upload.any(), updateProfile);
router.get("/:username", getUserProfile);

module.exports = router;
