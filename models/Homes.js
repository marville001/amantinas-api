const mongoose = require("mongoose");

const homesSchema = new mongoose.Schema({
    investorId: {
        type: String,
        required: true,
    },
    scraped: {
        type: Boolean,
        required: true,
    },
    category: {
        type: String,
        enum: ["prospect", "active", "managed", "archived", "scrapped"],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
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
});

const Home = mongoose.model("Home", homesSchema);
module.exports = Home;
