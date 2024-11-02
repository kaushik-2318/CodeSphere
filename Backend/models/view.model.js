const mongoose = require("mongoose");

const viewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    template: [
        {
            templateId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "template",
                required: true,
                unique: true,
            },
            views: [{
                timestamp: {
                    type: Date,
                    required: true,
                },
                views: {
                    type: Number,
                    required: true,
                },
            }],
        }
    ]
})

const View = mongoose.model("View", viewSchema);

module.exports = View;
