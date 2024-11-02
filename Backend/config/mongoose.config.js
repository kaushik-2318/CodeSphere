const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(function () {
            console.log("Connected to database");
        });
    } catch (err) {
        console.error("Mongodb Connection Error:- ", err);
        process.exit(1);
    }
};

module.exports = connectDB;
