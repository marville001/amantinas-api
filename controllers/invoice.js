const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Invoice = require("../models/Invoice");

module.exports = {
    getInvoices: catchAsync(async (req, res) => {
        const { investorId } = req.params;
        const pagesize = req.query.pageSize || 10;
        const page = req.query.activePage || 1;

        const query = {
            skip: pagesize * (page > 0 ? page - 1 : 1),
            limit: pagesize,
        };

        const invoices = await Invoice.find(
            {
                investorId,
            },
            {},
            query
        ).sort([["createdAt", -1]]);
        const total = await Invoice.find({
            investorId,
        });

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            invoices,
            total: total.length,
        });
    }),

    createInvoice: catchAsync(async (req, res) => {
        const {
            investorId,
            homeId,
            title,
            date,
            recurring,
            amount,
            business,
            description,
            type,
        } = req.body;

        if (recurring && !req.body.startDate)
            return res
                .status(400)
                .send({ success: false, message: "Please Provide Start Date" });

        const invoice = await Invoice.create({
            investorId,
            homeId,
            title,
            date,
            recurring,
            amount,
            business,
            description,
            type,
            startDate: recurring ? req.body.startDate : "",
            endDate: req.body.endDate || "",
            isCustom: req.body.isCustom || false,
            interval: req.body.interval || "",
        });

        invoice.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Invoice Added successfully.`,
            invoice,
        });
    }),
};
