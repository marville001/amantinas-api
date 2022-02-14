const catchAsync = require("../utils/catchAsync");

module.exports = {
    getScrapes: catchAsync(async (req, res) => {
        res.send({ scrapes: [] });
    }),

    createScrape: catchAsync(async (req, res) => {
        res.send({ scrapes: [] });
    }),
};
