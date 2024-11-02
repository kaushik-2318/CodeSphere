const View = require("../models/view.model");

const increaseViews = async (req, res) => {
    try {
        const { templateId } = req.params;
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));

        const viewDocument = await View.findOne({ "template.templateId": templateId });

        if (!viewDocument) {
            return res.status(404).json({ message: "View document not found for this template" });
        }

        const templateEntry = viewDocument.template.find(template => template.templateId.toString() === templateId);

        if (!templateEntry) {
            return res.status(404).json({ message: "Template not found" });
        }

        const todayEntry = templateEntry.views.find(view => {
            const entryDate = new Date(view.timestamp);
            return (
                entryDate.getFullYear() === startOfDay.getFullYear() &&
                entryDate.getMonth() === startOfDay.getMonth() &&
                entryDate.getDate() === startOfDay.getDate()
            );
        });

        if (todayEntry) {
            todayEntry.views += 1;
        } else {
            templateEntry.views.push({
                timestamp: startOfDay,
                views: 1,
            });
        }

        await viewDocument.save();

        res.status(200).json({
            message: "View count increased successfully",
            totalViews: templateEntry.views.reduce((acc, view) => acc + view.views, 0),
        });
    } catch (error) {
        console.error("Error increasing view count:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = increaseViews;