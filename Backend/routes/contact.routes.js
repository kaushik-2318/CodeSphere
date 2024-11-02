const express = require("express");
const router = express.Router();
const { transporter } = require("../controllers/email.controller");

router.post("/sendEmail", async (req, res) => {
    const { email, phone, name, message } = req.body;

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: process.env.SMTP_MAIL,
        subject: `Message from ${name} - CodeSphere`,
        text: `${name} ${phone}  ${email} ${message}`,
        html: `Name:- ${name}<br>Phone:- ${phone}<br>Email:- ${email}<br>Message:- ${message}`,
    };
    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
