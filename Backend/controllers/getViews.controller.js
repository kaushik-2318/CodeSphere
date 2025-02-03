const Template = require("../models/template.model");

const getFormattedViews = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const templatesData = await Template.find({ owner: userId });
        
        if (!templatesData || templatesData.length === 0) {
            console.log("No templates found for this user");
            return res.status(404).json({ message: "No templates found for this user" });
        }
        
        const formattedData = templatesData.map(template => ({
            template: {
                templateId: template._id,
                views: template.views.map(viewEntry => ({
                    timestamp: viewEntry.timestamp.toISOString(),
                    views: viewEntry.views,
                }))
            }
        }));
        
        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching template views:", error);
        res.status(500).json({ error: "Failed to fetch template views" });
    }
};

module.exports = getFormattedViews;
