const Admin = require("../models/Admin");
const Investor = require("../models/Investor");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getAdmins: catchAsync(async (req, res) => {
        const admins = await Admin.find().select("-password");

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            admins,
        });
    }),
    getInvestors: catchAsync(async (req, res) => {
        const investors = await Investor.find().select("-password");

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            investors,
        });
    }),
    deleteAdmin: catchAsync(async (req, res) => {
        const {id} = req.params;
        await Admin.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
    deleteInvestor: catchAsync(async (req, res) => {
        const {id} = req.params;
        await Investor.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
