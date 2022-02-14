const Home = require("../models/Homes");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");

module.exports = {
    getHomes: catchAsync(async (req, res) => {
        if (!req.body.investorId)
            return res.status(400).send({
                success: false,
                message: "Please provide investor id",
            });
        const { investorId } = req.body;
        const homes = await Home.find({
            investorId
        });
        // select expiclity password

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            homes,
        });
    }),

    createProspect: catchAsync(async (req, res) => {
        if (!req.files || !req.files.image) {
            return res
                .status("400")
                .send({ success: false, message: "No 'image' selected" });
        }

        const id = crypto.randomBytes(8).toString("hex");

        const { image } = req.files;
        const imageLink = `${id + "_" + image.name}`;
        image.mv(`uploads/${imageLink}`);

        const {
            investorId,
            scraped,
            category,
            name,
            location,
            bedrooms,
            bathrooms,
            price,
        } = req.body;

        const prospect = await Home.create({
            investorId,
            scraped,
            category,
            name,
            location,
            bedrooms,
            bathrooms,
            price,
            images: [imageLink],
        });

        prospect.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Prospect Added successfully.`,
            prospect,
        });
    }),
};
