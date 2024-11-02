const { userModel } = require("../models/user.model");

const getBookmark = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const user = await userModel
            .findById(userId)
            .populate({
                path: "bookmark",
                populate: { path: "owner", select: "username profilepicture" },
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error fetching user's Bookmark", error });
    }
};

module.exports = getBookmark;
