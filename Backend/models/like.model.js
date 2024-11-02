const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    likeCount: {
        type: Number,
        default: 0,
        require: true,
    },
    userId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "template",
    },
});

let likeModel = mongoose.model("like", likeSchema);
module.exports = likeModel;
