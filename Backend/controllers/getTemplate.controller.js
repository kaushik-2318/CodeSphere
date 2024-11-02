const templateModel = require("../models/template.model");

const getTemplate = async (req, res, next) => {
    try {
        const templateId = req.params.id;

        const template = await templateModel.findById({ _id: templateId })
            .populate({
                path: "owner",
                model: "user",
                select: "username profilepicture name"
            })

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        res.status(200).json(template);
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error fetching user's templates", error });
    }
};

module.exports = getTemplate;
