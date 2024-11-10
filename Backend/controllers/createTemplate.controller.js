const { userModel } = require("../models/user.model");
const templateModel = require("../models/template.model");
const likeModel = require("../models/like.model");
const viewModel = require("../models/view.model")
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const fbAdmin = require("../config/firebase.config");
const upload = require("../config/multer.config");
const bucket = fbAdmin.storage().bucket();

const createTemplate = async (req, res) => {
    try {
        const { posttitle, hastag, livelink, githuburl, framework, style, language, frameworkCode, styleCode, languageCode, imageUrl } = req.body;

        if (!req.file && !imageUrl) {
            return res.status(400).json({ message: "No image file or URL provided" });
        }

        let imagePublicUrl;

        if (req.file) {
            imagePublicUrl = req.file.publicUrl;
        } else if (imageUrl && imageUrl.startsWith("http://localhost:3000/")) {
            const filename = path.basename(imageUrl);
            const localImagePath = path.join(__dirname, "../public", filename);
            const response = await axios.get(imageUrl, { responseType: "stream" });
            response.data.pipe(fs.createWriteStream(localImagePath));

            await new Promise(resolve => response.data.on("end", resolve));

            const destination = `${filename}`;
            await bucket.upload(localImagePath, { destination });
            const [publicUrl] = await bucket.file(destination).getSignedUrl({
                action: "read",
                expires: "03-09-2500"
            });
            fs.unlinkSync(localImagePath);
            imagePublicUrl = publicUrl;
        }

        const template = await templateModel.create({
            title: posttitle,
            thumbnail: imagePublicUrl,
            hastag,
            livelink,
            githuburl,
            owner: req.user._id,
            framework,
            style,
            language,
            frameworkCode,
            styleCode,
            languageCode,
        });

        await likeModel.create({ templateId: template._id });

        await viewModel.create({
            userId: req.user._id,
            template: [{ templateId: template._id, views: [] }],
        });

        await userModel.findByIdAndUpdate(
            req.user._id,
            { $push: { templates: template._id } },
            { new: true }
        );

        res.status(201).json({
            message: "Template created successfully and linked to user",
            template,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = createTemplate;
