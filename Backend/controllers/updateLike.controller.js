const likeModel = require("../models/like.model");
const { userModel } = require("../models/user.model");

const updateLike = async (req, res) => {
    try {
        const templateId = req.params.id;
        const userId = req.user._id;

        let postLike = await likeModel.findOne({ templateId });

        const user = await userModel.findById(userId);

        if (!postLike) {
            postLike = new likeModel({
                templateId,
                likeCount: 1,
                userId: [userId],
            });
            user.like.push(templateId);
            await postLike.save();
            await user.save();
            return res.status(201).json({ message: "Post liked" });
        }

        const hasLiked = postLike.userId.includes(userId);

        if (hasLiked) {
            postLike.likeCount -= 1;
            user.like = user.like.filter((like) => like.toString() !== templateId);
            postLike.userId = postLike.userId.filter((user) => !user.equals(userId));
        } else {
            postLike.likeCount += 1;
            user.like.push(templateId);
            postLike.userId.push(userId);
        }

        await postLike.save();
        await user.save();

        return res
            .status(200)
            .json({ message: hasLiked ? "Post unliked" : "Post liked" });
    } catch (error) {
        console.error("Error Occurred:", error);
        res.status(500).json({ message: "Error", error });
    }
};

module.exports = updateLike;
