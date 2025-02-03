const templateModel = require("../models/template.model");

const editTemplate = async (req, res) => {
    try {
        const templateId = req.params.id || req.body.id;

        const { posttitle, hastag, livelink, githuburl, framework, style, language, frameworkCode, styleCode, languageCode } = req.body;

        let imagePublicUrl = null;

        if (req.files && req.files.length > 0) {
            imagePublicUrl = req.files[0].publicUrl;
        }

        const updateData = {
            title: posttitle,
            hastag,
            livelink,
            githuburl,
            framework,
            style,
            language,
            frameworkCode,
            styleCode,
            languageCode,
        };

        if (imagePublicUrl) {
            updateData.thumbnail = imagePublicUrl;
        }

        const updatedTemplate = await templateModel.findByIdAndUpdate(templateId, updateData, { new: true, runValidators: true });

        if (!updatedTemplate) {
            return res.status(404).json({ message: "Template not found" });
        }

        res.status(200).json({
            message: "Template updated successfully",
            template: updatedTemplate,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = { editTemplate };
