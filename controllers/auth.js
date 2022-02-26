const Investor = require("../models/Investor");
const SubUser = require("../models/SubUser");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const _ = require("lodash");

module.exports = {
    getUserDetails: catchAsync(async (req, res) => {
        const { email } = req.user;
        const user = await Investor.findOne({ email }).select("-password");

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            user,
            token: user.generateAuthToken(),
        });
    }),

    loginInvestor: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        let user = await Investor.findOne({ email }).select("+password"); // select expiclity password

        if (!user) {
            user = await SubUser.findOne({ email }).select("+password"); // select expiclity password

            if (!user)
                return res
                    .status(400)
                    .send({ success: false, message: "Wrong credentials" });

            if (!user.activated)
                return res.status(400).send({
                    success: false,
                    message: "Please use email sent to activate your account",
                });

            let valid = await user.correctPassword(password, user.password);
            if (!valid)
                return res.status(400).send({
                    success: false,
                    message: "Invalid email or password...",
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
                    "type",
                    "investorId",
                ]),
                token: user.generateAuthToken(),
            });
        }

        if (user.loginType !== "email")
            return res.status(400).send({
                success: false,
                message: `Please login with ${user.loginType}`,
            });

        let validPassword = await user.correctPassword(password, user.password);
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password...",
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
        if (!req.body.email)
            return res
                .status(400)
                .send({ success: false, message: "email is required" });

        const { email } = req.body;
        const user = await Investor.findOne({ email }).select("+password"); // select expiclity password

        if (!user)
            return res.status(400).send({
                success: false,
                message:
                    "An account with the info does not exist. Please signup",
            });

        if (user.loginType !== "google")
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

    loginInvestorFacebook: catchAsync(async (req, res) => {
        if (!req.body.email)
            return res
                .status(400)
                .send({ success: false, message: "email is required" });

        const { email } = req.body;
        const user = await Investor.findOne({ email }).select("+password"); // select expiclity password

        if (!user)
            return res.status(400).send({
                success: false,
                message:
                    "An account with the info does not exist. Please signup",
            });

        if (user.loginType !== "facebook")
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
        if (!req.body.email)
            return res
                .status(400)
                .send({ success: false, message: "email is required" });
        if (!req.body.name)
            return res
                .status(400)
                .send({ success: false, message: "Name is required" });

        const { name, email } = req.body;

        // Check if user email or username exists
        let user = await Investor.findOne({ email });
        if (user)
            return res.status(400).send({
                success: false,
                message: "An account with that email already exists",
            });

        user = await Investor.create({
            name,
            email,
            loginType: "google",
        });

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

    registerInvestorFacebook: catchAsync(async (req, res) => {
        if (!req.body.email)
            return res
                .status(400)
                .send({ success: false, message: "email is required" });
        if (!req.body.name)
            return res
                .status(400)
                .send({ success: false, message: "Name is required" });

        const { name, email } = req.body;

        // Check if user email or username exists
        let user = await Investor.findOne({ email });
        if (user)
            return res.status(400).send({
                success: false,
                message: "An account with that email already exists",
            });

        user = await Investor.create({
            name,
            email,
            loginType: "facebook",
        });

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
};
