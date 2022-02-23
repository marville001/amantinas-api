const mongoose = require("mongoose");

const timelogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    timeIn: {
        type: Date,
        required: true,
    },
    timeOut: {
        type: Date,
        default: "",
    },
    work: {
        type: String,
        default: "",
    },
});

const TimeLog = mongoose.model("TimeLog", timelogSchema);
module.exports = TimeLog;
