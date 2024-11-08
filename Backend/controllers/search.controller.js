const { userModel } = require("../models/user.model");
const templateModel = require("../models/template.model");

const search = async (req, res) => {
    const searchTerm = req.query.q;

    try {
        const users = await userModel.find({
            username: { $regex: searchTerm, $options: "i" }
        }).select("username");

        const templates = await templateModel.find({
            title: { $regex: searchTerm, $options: "i" }
        }).select("title ");

        res.json({ users, templates });
    } catch (error) {
        res.status(500).json({ message: "Error searching", error });
    }
};

module.exports = search;
