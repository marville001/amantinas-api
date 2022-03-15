const mongoose = require("mongoose");

const scrapedHomesSchema = new mongoose.Schema({
    scrapeId: {
        type: String,
        required: true,
        ref: "Scrape",
    },
    homeId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: "",
    },
    bedrooms: {
        type: String,
        required: true,
    },
    bathrooms: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: "",
    },
});

const ScrapedHome = mongoose.model("ScrapedHome", scrapedHomesSchema);
module.exports = ScrapedHome;
