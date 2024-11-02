const { userModel } = require("../models/user.model");
const emailOtpModel = require("../models/emailotp.model");

const verifyEmailOtp = async function (req, res) {
    try {

        const otp = parseInt(req.body.otp);
        
        if (!otp || isNaN(otp)) {
            return res.status(400).json({ message: "Invalid or missing OTP" });
        }

        const user = await userModel.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otpRecord = await emailOtpModel.findOne({ userId: req.user._id });

        if (!otpRecord) {
            return res.status(404).json({ message: "No OTP request found for this user" });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Incorrect OTP" });
        }

        user.isEmailVerified = true;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { verifyEmailOtp };
