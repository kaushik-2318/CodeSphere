const express = require("express");
const router = express.Router();
const createTemplate = require("../controllers/createTemplate.controller.js");
const getAllTemplates = require("../controllers/getAllTemplates.controller.js");
const updateLike = require("../controllers/updateLike.controller.js");
const addbookmark = require("../controllers/addBookmark.controller.js");
const getBookmark = require("../controllers/getBookmark.controller.js");
const increaseViews = require("../controllers/increaseViews.controller.js");
const getViews = require("../controllers/getViews.controller.js");
const getScreenshot = require("../controllers/getScreenshot.controller.js");
const getTemplate = require("../controllers/getTemplate.controller.js")
const isAuthenticated = require("../middleware/auth.middleware.js");
const likeAuthenticated = require("../middleware/like.middleware.js");
const upload = require("../config/multer.config");

router.put("/increaseViews/:templateId", increaseViews)
router.get("/getViews", isAuthenticated, getViews)
router.post("/createtemplate", isAuthenticated, (req, res, next) => { upload.single("image")(req, res, (err) => { if (err) { return res.status(400).json({ message: err.message }); } createTemplate(req, res); }); })
router.get("/getalltemplate", likeAuthenticated, getAllTemplates);
router.put("/updateLike/:id", isAuthenticated, updateLike);
router.put("/addbookmark/:id", isAuthenticated, addbookmark);
router.get("/getBookmark", isAuthenticated, getBookmark);
router.get("/screenshot", getScreenshot);
router.get("/:id", getTemplate);

module.exports = router;
