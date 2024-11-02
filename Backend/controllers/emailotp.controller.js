const { userModel } = require("../models/user.model");
const otpGenerator = require('otp-generator')
const { transporter } = require("../controllers/email.controller");
const emailOtpModel = require("../models/emailotp.model");


const sendEmailOtp = async function (req, res) {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        let otpRecord = await emailOtpModel.findOne({ userId: req.user._id });
      
        if (otpRecord) {
            otpRecord.otp = otp;
            await otpRecord.save();
        } else {
            otpRecord = new emailOtpModel({
                otp: otp,
                userId: req.user._id,
            });
            await otpRecord.save();
        }

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: user.email,
            subject: `OTP for CodeSphere`,
            text: `Your OTP is: ${otp}`,
            html: `<p>Your OTP for CodeSphere is: <b>${otp}</b></p>`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }
};

module.exports = { sendEmailOtp };
