const Admin = require("../models/Admin");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const _ = require("lodash");

module.exports = {
    getAdminDetails: catchAsync(async (req, res) => {
        const { email } = req.user;
        const admin = await Admin.findOne({ email }).select("-password");
        // select expiclity password

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            admin,
            token: admin.generateAuthToken(),
        });
    }),
    adminLogin: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email }).select("+password"); // select expiclity password

        if (!admin)
            return res
                .status(400)
                .send({ success: false, message: "invalid email or password" });

        let validPassword = await admin.correctPassword(
            password,
            admin.password
        );
        if (!validPassword)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password...",
            });

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            admin: _.pick(admin, [
                "_id",
                "name",
                "email",
                "role",
                "avatar",
                "createdAt",
            ]),
            token: admin.generateAuthToken(),
        });
    }),
    createAdmin: catchAsync(async (req, res) => {
        const { name, email, password } = req.body;

        // Check if user email or username exists
        let admin = await Admin.findOne({ email });
        if (admin)
            return res
                .status(400)
                .send({ success: false, message: "email already registered" });
        admin = await Admin.create({
            name,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);

        admin.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Registration successfull.`,
            admin: _.pick(admin, [
                "_id",
                "name",
                "email",
                "role",
                "createdAt",
                "activated",
            ]),
            token: admin.generateAuthToken(),
        });
    }),
};
