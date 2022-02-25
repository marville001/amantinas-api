const catchAsync = require("../utils/catchAsync");
const _ = require("lodash");
const SubUser = require("../models/SubUser");
const Investor = require("../models/Investor");
const sendEmail = require("../utils/sendEmail");

module.exports = {
    getSubUsers: catchAsync(async (req, res) => {
        const subusers = await SubUser.find().select("-password");
        // select expiclity password

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            users: subusers,
        });
    }),
    createSubUser: catchAsync(async (req, res) => {
        if (
            !req.body.sundayFree &&
            (!req.body.sunFromTime || !req.body.sunToTime)
        )
            return res.status(400).send({
                success: false,
                message: "Please provide sunday time.(from and to)",
            });

        // Check if user email or username exists
        let subuser = await SubUser.findOne({ email: req.body.email });
        let user = await Investor.findOne({ email: req.body.email });
        if (subuser || user)
            return res
                .status(400)
                .send({ success: false, message: "email already registered" });

        subuser = await SubUser.create(req.body);

        // Generate Account Activation Link
        const activationToken = subuser.createAccountActivationLink();

        // Send email to create passowrd
        await sendEmail({
            to: req.body.email,
            from: process.env.FROM_EMAIL,
            subject: "Account Verification - Please activate your account",
            html: `
            <h2>Hello <strong> ${req.body.firstname}</strong></h2>
            </br>
            <a href="${process.env.APP_URL}set-pass?token=${activationToken}">Click here to create password</a>
            `,
        });

        subuser.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Sub User Added successfully and activation email sent.`,
            user: subuser,
        });
    }),
};
