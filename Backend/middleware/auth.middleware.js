const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ _id: decoded._id });

        const isTokenBlacklisted = await blacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({ message: "Token is blacklisted" });
        }

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Not Authorize");
    }
};

module.exports = isAuthenticated;
