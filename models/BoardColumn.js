const mongoose = require("mongoose");

const boardColumnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    items: {
        type: [String],
        required: true,
    },
    boardId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const BoardColumn = mongoose.model("BoardColumn", boardColumnSchema);
module.exports = BoardColumn;
