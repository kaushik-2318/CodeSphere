const userModel = require("../models/user.model");
const templateModel = require("../models/template.model");

const addBookmark = async (req, res) => {
    try {
        const userId = req.user._id;
        const templateId = req.params.id;

        const user = await userModel.userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBookmarked = user.bookmark.includes(templateId);

        if (isBookmarked) {
            user.bookmark = user.bookmark.filter(
                (id) => id.toString() !== templateId
            );
            await user.save();

            return res
                .status(200)
                .json({ message: "Template removed from bookmarks" });
        } else {
            const template = await templateModel.findById(templateId);
            if (!template) {
                return res.status(404).json({ message: "Template not found" });
            }

            user.bookmark.push(templateId);
            await user.save();

            return res
                .status(200)
                .json({ message: "Template bookmarked successfully" });
        }
    } catch (error) {
        console.error("Error in bookmarking template:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = addBookmark;
