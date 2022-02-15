const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    suggestionId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote;
