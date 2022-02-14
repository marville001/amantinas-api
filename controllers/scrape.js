const Scrape = require("../models/Scrape");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getScrapes: catchAsync(async (req, res) => {
        if (!req.body.investorId)
            return res.status(400).send({
                success: false,
                message: "Please investor id",
            });
        const { investorId } = req.body;
        const scrapes = await Scrape.find({ investorId });
        // select expiclity password

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            scrapes,
        });

        res.send({ scrapes: [] });
    }),

    createScrape: catchAsync(async (req, res) => {
        res.send({ scrapes: [] });
    }),
};
