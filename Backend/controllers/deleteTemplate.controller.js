const templateModel = require("../models/template.model");

const deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const template = await templateModel.findById(templateId).populate("owner", select = "id");

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }
        if (template.owner.id !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await templateModel.deleteOne({ _id: templateId });
        res.json({ message: "Template deleted successfully" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error deleting template" });
    }
};
module.exports = deleteTemplate;
