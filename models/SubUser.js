const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const subUserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please tell us your first name!"],
        trim: true,
        maxlength: [20, "must be less than or equal to 20"],
        minlength: [3, "must be greater than 3"],
    },
    lastname: {
        type: String,
        required: [true, "Please tell us your first name!"],
        trim: true,
        maxlength: [20, "must be less than or equal to 20"],
        minlength: [3, "must be greater than 3"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        required: [true, "Please provide sub user role"],
        trim: true,
        lowercase: true,
    },
    weekDayFromTime: {
        type: String,
        required: true,
    },
    weekDayToTime: {
        type: String,
        required: true,
    },
    satFromTime: {
        type: String,
        required: true,
    },
    satToTime: {
        type: String,
        required: true,
    },
    sunFromTime: {
        type: String,
    },
    sunToTime: {
        type: String,
    },
    sundayFree: {
        type: Boolean,
    },
    loginType: {
        type: String,
        enum: ["email"],
        default: "email",
    },
    password: {
        type: String,
        default: "",
    },
    activationToken: {
        type: String,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    activated: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    avatar: {
        type: String,
        default:
            "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png",
    },
});

// Method for creating an activation link token
subUserSchema.methods.createAccountActivationLink = function () {
    const activationToken = crypto.randomBytes(32).toString("hex");
    this.activationLink = crypto
        .createHash("sha256")
        .update(activationToken)
        .digest("hex");
    return activationToken;
};

// comparing password
subUserSchema.methods.correctPassword = async function (
    candidate_Password,
    user_Password
) {
    return await bcrypt.compare(candidate_Password, user_Password);
};

// Method for generating a reset token
subUserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const SubUser = mongoose.model("SubUser", subUserSchema);
module.exports = SubUser;
