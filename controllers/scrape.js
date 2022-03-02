const Scrape = require("../models/Scrape");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getScrapes: catchAsync(async (req, res) => {
        const { investorId } = req.params;
        const scrapes = await Scrape.find({ investorId });
        // select expiclity password

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            scrapes,
        });
    }),

    createScrape: catchAsync(async (req, res) => {
        const scrape = await Scrape.create(req.body);

        scrape.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Scrape Added successfully.`,
            scrape,
        });
    }),
};
