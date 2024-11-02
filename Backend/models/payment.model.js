const { types, required } = require("joi");
const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
        },
        paymentId: {
            type: String,
            required: true,
        },
        signature: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "success", "failed"],
        },
    },
    { timestamps: true }
);

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
