const Transaction = require("../models/Transaction");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");

module.exports = {
    getTransactions: catchAsync(async (req, res) => {
        const { investorId } = req.params;
        const pagesize = req.query.pageSize || 10;
        const page = req.query.activePage || 1;

        const query = {
            skip: pagesize * (page > 0 ? page - 1 : 1),
            limit: pagesize,
        };

        const transactions = await Transaction.find(
            {
                investorId,
            },
            {},
            query
        );
        const total = await Transaction.find({
            investorId,
        });

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            transactions,
            total: total.length,
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
            isCustom: req.body.isCustom || false,
            interval: req.body.interval || "",
        });

        transaction.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Transaction Added successfully.`,
            transaction,
        });
    }),
};
