const mongoose = require("mongoose");

const emailotpSchema = mongoose.Schema({
    otp: {
        type: Number,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
        unique: true,
    },
});

let emailOtp = mongoose.model("emailOtp", emailotpSchema);
module.exports = emailOtp;
