const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 20,
            match: /^[a-zA-Z0-9_]+$/,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 50,
            required: true,
        },
        contactnumber: {
            type: Number,
            unique: true,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid mobile number!`,
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u,
                "Invalid email format",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        location: {
            type: String,
            default: "Add Location",
        },
        bio: {
            type: String,
            default: "Add Bio",
            maxlength: 340,
        },
        templates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "template",
            },
        ],
        like: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "template",
            },
        ],
        bookmark: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "template",
            },
        ],
        profilepicture: {
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/codesphere-7627c.appspot.com/o/defaults%2FdefaultProfilePhoto.avif?alt=media&token=b30e98a3-9f84-4d7c-b459-c5c2986b5684",
        },
        coverphoto: {
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/codesphere-7627c.appspot.com/o/defaults%2FdefaultCoverPhoto.png?alt=media&token=8cfffc02-6a1e-44f5-89b2-297c4180237b",
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

function userSchemaValidation(data) {
    const Schema = Joi.object({
        username: Joi.string()
            .min(5)
            .max(20)
            .pattern(/^[a-zA-Z0-9_]+$/)
            .required()
            .trim(),
        name: Joi.string().min(2).max(50).required().trim(),
        email: Joi.string()
            // .email()
            .required(),
        contactnumber: Joi.number()
            .integer()
            .required()
            .min(1000000000)
            .max(9999999999),
        password: Joi.string().min(8).required(),
        location: Joi.string().optional(),
        bio: Joi.string().optional(),
        date: Joi.date().default(Date.now),
    });
    let { error } = Schema.validate(data);
    return error;
}

let userModel = mongoose.model("user", userSchema);
module.exports = { userSchemaValidation, userModel };
