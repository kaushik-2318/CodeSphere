const { userModel } = require("../models/user.model");
const likeModel = require("../models/like.model");

const getBookmark = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const user = await userModel.findById(userId).populate({
            path: "bookmark",
            populate: { path: "owner", select: "username profilepicture" },
            select: "thumbnail title",
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookmarks = await Promise.all(
            user.bookmark.map(async (template) => {
                const likeData = await likeModel.findOne({ templateId: template._id });

                return {
                    ...template.toObject(),
                    userLiked: likeData ? likeData.userId.includes(userId.toString()) : false,
                };
            })
        );

        res.status(200).json({ bookmarks });
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error fetching user's bookmarks", error });
    }
};

module.exports = getBookmark;
