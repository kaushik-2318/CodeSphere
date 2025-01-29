const { userModel, userSchemaValidation } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const registerUser = async function (req, res) {
    const { name, email, password, username, contactnumber } = req.body;

    try {
        if (!name || !email || !password || !username || !contactnumber) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        let error = userSchemaValidation({
            name,
            email,
            password,
            username,
            contactnumber,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let user = await userModel.findOne({
            $or: [{ email }, { username }, { contactnumber }],
        });

        if (user) {
            if (user.email === email) {
                return res.status(400).send({ message: "Email Already Exists" });
            }
            if (user.username === username) {
                return res.status(400).send({ message: "Username Already Exists" });
            }
            if (user.contactnumber == contactnumber) {
                return res
                    .status(400)
                    .send({ message: "Contact Number Already Exists" });
            }
        }

        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password, salt);

        user = await userModel.create({
            email,
            password: hash,
            name,
            username,
            contactnumber,
        });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "168h",
        });

        res.status(201).json({ message: "User Created Successfully", user, token });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

const loginUser = async function (req, res) {
    const { email, password, rememberme } = req.body;

    try {
        if (!email || !password) {
            return res.status(500).json({ message: "All Field are required" });
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: "User does't exit." });
        }

        let result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(401).send({ message: "Email or Password incorrect" });
        }

        if (result) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "168h",
            });

            res.status(201).send({ message: "Login Successfully", user, token });
        } else {
            return res.status(401).send({ message: "Email or Password incorrect" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const logout = async function (req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res
                .status(401)
                .send({ message: "Unauthorized - Token not found" });
        }

        const token = authHeader.split(" ")[1];

        const isTokenBlacklisted = await blacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res
                .status(401)
                .send({ message: "Unauthorized - Token is blacklisted" });
        }

        await blacklistModel.create({ token });
        res.status(200).send({ message: "Successfully logged out" });
    } catch (error) {
        res.status(500).send({ message: `Logout failed: ${error.message}` });
    }
};

module.exports = { registerUser, loginUser, logout };
