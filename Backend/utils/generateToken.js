const jwt = require("jsonwebtoken");

const generateToken = (data) => {
    return jwt.sign(data, "updwtecxmlrnxxjv");
};

module.exports = generateToken;
