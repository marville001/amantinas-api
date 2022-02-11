const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
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
        enum: ["admin"],
        default: "admin",
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, "must be greater than 8"],
        select: false,
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

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
    return token;
};

adminSchema.methods.createAccountActivationToken = function () {
    const activationToken = crypto.randomBytes(32).toString("hex");
    // console.log(activationToken);
    this.activationToken = crypto
        .createHash("sha256")
        .update(activationToken)
        .digest("hex");
    // console.log({ activationToken }, this.activationLink);
    return activationToken;
};

// comparing password
adminSchema.methods.correctPassword = async function (
    candidate_Password,
    user_Password
) {
    return await bcrypt.compare(candidate_Password, user_Password);
};

// Create a reset token for each user
adminSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    console.log({ resetToken });

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
