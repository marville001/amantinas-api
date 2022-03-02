const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    homeId: {
        type: String,
        required: true,
    },
    investorId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    recurring: {
        type: Boolean,
        required: true,
    },
    startDate: {
        type: String,
        default: "",
    },
    isCustom: {
        type: Boolean,
        default: false,
    },
    interval: {
        type: String,
        default: "",
    },
    endDate: {
        type: String,
        default: "",
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
