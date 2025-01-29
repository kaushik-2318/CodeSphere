const { userModel } = require("../models/user.model");

const getProfile = async function (req, res, next) {
    try {
        const user = await userModel.findById(req.user._id)
            .populate({
                path: "templates",
                model: "template",
                select: "title thumbnail"
            })
            .select("-password -contactnumber -email -_id -like -bookmark -date -updatedAt -createdAt");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch likes for each template
        const templatesWithLikes = await Promise.all(user.templates.map(async (template) => {
            const likeCount = await userModel.countDocuments({ like: template._id });
            return {
                ...template.toObject(),
                likeCount
            };
        }));

        res.status(200).json({
            message: "User Fetched Successfully",
            user: { ...user.toObject(), templates: templatesWithLikes }
        });

    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error fetching user", error });
    }
};

module.exports = { getProfile };
