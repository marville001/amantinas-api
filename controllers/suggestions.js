const Suggestion = require("../models/Suggestion");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getSuggestions: catchAsync(async (req, res) => {
        const suggestions = await Suggestion.find({ isDeleted: false });
        // select expiclity password

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            suggestions,
        });
    }),

    createSuggestion: catchAsync(async (req, res) => {
        const suggestion = await Suggestion.create(req.body);

        suggestion.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Suggestion Added successfully.`,
            suggestion,
        });
    }),
};
