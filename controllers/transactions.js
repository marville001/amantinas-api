const Transaction = require("../models/Transaction");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");

module.exports = {
    getTransactions: catchAsync(async (req, res) => {
        const { investorId } = req.params;
        const transactions = await Transaction.find({
            investorId,
        });

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            transactions,
        });
    }),

    createTransaction: catchAsync(async (req, res) => {
        const {
            investorId,
            homeId,
            title,
            date,
            recurring,
            amount,
            description,
            type,
        } = req.body;

        if (recurring && !req.body.startDate)
            return res
                .status(400)
                .send({ success: false, message: "Please Provide Start Date" });

        const transaction = await Transaction.create({
            investorId,
            homeId,
            title,
            date,
            recurring,
            amount,
            description,
            type,
            startDate: recurring ? req.body.startDate : "",
            endDate: req.body.endDate || "",
        });

        transaction.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Transaction Added successfully.`,
            transaction,
        });
    }),
};
