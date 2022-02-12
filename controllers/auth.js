const Investor = require("../models/Investor");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const _ = require("lodash");

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
        const { email, password } = req.body;
        const user = await Investor.findOne({ email }).select("+password"); // select expiclity password

        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "invalid email or password" });

        let validPassword = await user.correctPassword(password, user.password);
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password...",
            });

        if (user.loginType !== "email")
            return res.status(400).send({
                success: false,
                message: `Please login with ${user.loginType}`,
            });

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            user: _.pick(user, [
                "_id",
                "name",
                "plan",
                "email",
                "loginType",
                "role",
                "createdAt",
                "activated",
            ]),
            token: user.generateAuthToken(),
        });
    }),
    loginInvestorGoogle: catchAsync(async (req, res) => {
        res.send("Login Investor through google");
    }),
    loginInvestorFacebook: catchAsync(async (req, res) => {
        res.send("Login Investor through Facebook");
    }),

    registerInvestor: catchAsync(async (req, res) => {
        const { name, email, password } = req.body;

        // Check if user email or username exists
        let user = await Investor.findOne({ email });
        if (user)
            return res
                .status(400)
                .send({ success: false, message: "email already registered" });
        user = await Investor.create({
            name,
            email,
            password,
            loginType: "email",
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Registration successfull.`,
            user: _.pick(user, [
                "_id",
                "name",
                "plan",
                "email",
                "loginType",
                "role",
                "createdAt",
                "activated",
            ]),
            token: user.generateAuthToken(),
        });
    }),
    registerInvestorGoogle: catchAsync(async (req, res) => {
        res.send("Register Investor through google");
    }),
    registerInvestorFacebook: catchAsync(async (req, res) => {
        res.send("Register Investor through Facebook");
    }),
};
