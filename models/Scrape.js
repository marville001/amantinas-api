const mongoose = require("mongoose");

const scrapeSchema = new mongoose.Schema({
    investorId: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "",
    },
    zipcode: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    since: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "",
    },
    pricerange: {
        type: [Number],
        default: [],
    },
    squarefeets: {
        type: [String],
        default: [],
    },
    bedrooms: {
        type: String,
        default: "",
    },
    bathrooms: {
        type: String,
        default: "",
    },
    execute: {
        type: String,
        default: "",
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    isRun: {
        type: Boolean,
        default: false,
    },
    homesCount: {
        type: Number,
        default: 0,
    },
    from: {
        type: String,
        required: true,
    },
});

const Scrape = mongoose.model("Scrape", scrapeSchema);
module.exports = Scrape;
