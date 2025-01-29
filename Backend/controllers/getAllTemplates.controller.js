const { userModel } = require("../models/user.model");
const likeModel = require("../models/like.model");
const templateModel = require("../models/template.model");
const jwt = require("jsonwebtoken");

const getAllTemplates = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;

        let user = null;
        if (userId) {
            user = await userModel.findById(userId).select("bookmark");
        }

        const templates = await templateModel.find().select("title thumbnail").populate("owner", "username profilepicture");

        const allTemplates = await Promise.all(
            templates.map(async (template) => {
                const likeData = await likeModel.findOne({ templateId: template._id });

                const userLiked = userId ? likeData.userId.includes(userId.toString()) : false;

                const userBookmark = user ? user.bookmark.includes(template._id.toString()) : false;

                return {
                    ...template.toObject(),
                    likeCount: likeData.likeCount,
                    userLiked: userLiked,
                    userBookmark: userBookmark,
                };
            })
        );

        res.status(200).json({ allTemplates });
    } catch (error) {
        console.error("Error fetching templates with likes and owner details:", error);
        res.status(500).json({ message: "Error fetching templates", error });
    }
};

module.exports = getAllTemplates;
