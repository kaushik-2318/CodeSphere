const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 70,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        hastag: {
            type: String,
        },
        livelink: {
            type: String,
            required: true,
            trim: true,
        },
        githuburl: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        framework: {
            type: String,
            required: true,
        },
        style: {
            type: String,
            required: true,
        },
        language: {
            type: String,
        },
        frameworkCode: {
            type: String,
            required: true,
        },
        styleCode: {
            type: String,
            required: true,
        },
        languageCode: {
            type: String,
        },
        views: [{
            timestamp: {
                type: Date,
                required: true,
            },
            views: {
                type: Number,
                required: true,
            }
        }],
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

let templateModel = mongoose.model("template", templateSchema);
module.exports = templateModel;
