const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "usernanme is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],

    },
    token: {
        type: String
    },
},
    { timeseries: true }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;