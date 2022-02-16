const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    columns: {
        type: Number,
        required: true,
    },
    investorId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
