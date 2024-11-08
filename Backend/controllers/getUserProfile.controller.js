const { userModel } = require("../models/user.model");

const getUserProfile = async (req, res, next) => {
    try {
        const username = req.params.username;

        const user = await userModel.findOne({ username })
            .select("-password -contactNumber -email")
            .populate({
                path: "templates",
                model: "template",
                select: "title thumbnail livelink githublink",
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User Fetched Successfully", user });
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error fetching user", error });
    }
}

module.exports = { getUserProfile };