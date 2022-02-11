const Investor = require("../models/Investor");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getUserDetails: catchAsync(async (req, res) => {
        const { email } = req.user;
        const user = await Investor.findOne({ email }).select("-password");
        // select expiclity password

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            user,
            token: user.generateAuthToken(),
        });
    }),
    loginInvestor: catchAsync(async (req, res) => {
        res.send("Register Investor");
    }),
    loginInvestorGoogle: catchAsync(async (req, res) => {
        res.send("Login Investor through google");
    }),
    loginInvestorFacebook: catchAsync(async (req, res) => {
        res.send("Login Investor through Facebook");
    }),
    registerInvestor: catchAsync(async (req, res) => {
        res.send("Register Investor");
    }),
    registerInvestorGoogle: catchAsync(async (req, res) => {
        res.send("Register Investor through google");
    }),
    registerInvestorFacebook: catchAsync(async (req, res) => {
        res.send("Register Investor through Facebook");
    }),
};
