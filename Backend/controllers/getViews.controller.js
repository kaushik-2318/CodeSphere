const View = require("../models/view.model");

const getFormattedViews = async (req, res) => {
    try {
        const userId = req.user._id;

       const viewsData = await View.find({ userId }).populate("template.templateId");

        if (!viewsData || viewsData.length === 0) {
            console.log("No views found for this user");
            return res.status(404).json({ message: "No views found for this user" });
        }

        const formattedData = viewsData.map(view => ({
            userId: view.userId,
            template: view.template.map(templateEntry => ({
                templateId: templateEntry.templateId._id,
                views: templateEntry.views.map(viewEntry => ({
                    timestamp: viewEntry.timestamp.toISOString(),
                    views: viewEntry.views,
                }))
            }))
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching views data:", error);
        res.status(500).json({ error: "Failed to fetch views data" });
    }
};

module.exports = getFormattedViews;
