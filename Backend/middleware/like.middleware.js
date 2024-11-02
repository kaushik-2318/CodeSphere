const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const likeAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        let user;

        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await userModel.findOne({ _id: decoded._id });
            req.user = user;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

module.exports = likeAuthenticated;
