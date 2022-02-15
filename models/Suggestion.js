const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    column: {
        type: String,
        enum: ["opinion", "planned", "progress"],
        default: "opinion",
    },
    userType: {
        enum: ["investor", "admin", "subuser"],
        required: true,
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    suggestion: {
        type: String,
        required: true,
    },
    vote: {
        type: Number,
        default: 1,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
module.exports = Suggestion;
