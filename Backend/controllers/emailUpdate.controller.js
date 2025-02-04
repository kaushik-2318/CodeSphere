const { userModel } = require("../models/user.model");

const emailUpdate = async (req, res) => {
    try {
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};

module.exports = emailUpdate;
