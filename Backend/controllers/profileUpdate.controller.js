const { userModel } = require("../models/user.model");

const updateProfile = async (req, res) => {
    try {
        const { name, username, location, bio } = req.body;

        if (!name || !username || !location || !bio) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        let background = null;
        let profilepicture = null;

        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
                if (file.fieldname === "coverphoto" && file.fieldname != null) {
                    background = file.publicUrl;
                } else if (
                    file.fieldname === "profilepicture" &&
                    file.fieldname != null
                ) {
                    profilepicture = file.publicUrl;
                }
            });
        }

        let user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.username = username;
        user.location = location;
        user.bio = bio;

        user.coverphoto = background !== null ? background : user.coverphoto;
        user.profilepicture =
            profilepicture !== null ? profilepicture : user.profilepicture;

        await user.save();

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { updateProfile };
