const Suggestion = require("../models/Suggestion");
const Vote = require("../models/Vote");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getSuggestions: catchAsync(async (req, res) => {
        const suggestions = await Suggestion.find({ isDeleted: false });

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

    voteSuggestion: catchAsync(async (req, res) => {
        const { userId, suggestionId, vote: v } = req.body;
        let vote = await Vote.find({ userId, suggestionId });

        if (vote.length > 0)
            return res
                .status(400)
                .send({ success: false, message: "You have alreasy voted" });

        vote = await Vote.create({ userId, suggestionId });

        vote.save({ validateBeforeSave: false });

        const suggestion = await Suggestion.findByIdAndUpdate(
            suggestionId,
            {
                $set: {
                    vote: v,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            suggestion,
        });
    }),
    updateSuggestionColumn: catchAsync(async (req, res) => {
        const { suggestionId, column } = req.body;
        let suggestion = await Suggestion.find({ _id: suggestionId });

        if (!suggestion)
            return res
                .status(400)
                .send({ success: false, message: "Invalid suggestion" });

        suggestion = await Suggestion.findByIdAndUpdate(
            suggestionId,
            {
                $set: {
                    column,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            suggestion,
        });
    }),

    deleteSuggestion: catchAsync(async (req, res) => {
        if (!req.body.suggestionId)
            return res
                .status(400)
                .send({ success: false, message: "Provide id" });

        const { suggestionId } = req.body;

        let suggestion = await Suggestion.find({ _id: suggestionId });

        if (!suggestion)
            return res
                .status(400)
                .send({ success: false, message: "Invalid suggestion" });

        await Suggestion.findByIdAndDelete(suggestionId);

        res.status(200).json({
            success: true,
            message: `Deleted Successfully.`
        });
    }),
};
