const Home = require("../models/Homes");
const ScrapedHomes = require("../models/ScrapedHomes");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");

module.exports = {
    getHomes: catchAsync(async (req, res) => {
        const { investorId } = req.params;
        const homes = await Home.find({
            investorId,
        }).sort([["createdAt", -1]]);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            homes,
        });
    }),
    getScrapedHomes: catchAsync(async (req, res) => {
        const { investorId } = req.params;
        const homes = await ScrapedHomes.find({
            investorId,
        }).sort([["createdAt", -1]]);

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

        const { image } = req.files;
        let images = [];
        for (let item of image) {
            const id = crypto.randomBytes(8).toString("hex");
            const imageLink = `${id + "_" + item.name}`;
            item.mv(`uploads/${imageLink}`);
            images.push(
                `https://amantinas-api.herokuapp.com/static/${imageLink}`
            );
        }

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
            images,
        });

        prospect.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Prospect Added successfully.`,
            prospect,
        });
    }),

    updateProspect: catchAsync(async (req, res) => {
        const { homeId } = req.params;
        let home = await Home.findById(homeId);

        if (!home)
            return res
                .status(400)
                .send({ success: false, message: "Invalid home Id" });

        home = await Home.findByIdAndUpdate(
            homeId,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            home,
        });
    }),
    deleteProspect: catchAsync(async (req, res) => {
        const { homeId } = req.params;
        let home = await Home.findById(homeId);

        if (!home)
            return res
                .status(400)
                .send({ success: false, message: "Invalid home Id" });

        await Home.findByIdAndDelete(homeId);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
        });
    }),
};
