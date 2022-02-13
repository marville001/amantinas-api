const catchAsync = require("../utils/catchAsync");
const _ = require("lodash");
const SubUser = require("../models/SubUser");

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
        if (subuser)
            return res
                .status(400)
                .send({ success: false, message: "email already registered" });
        subuser = await SubUser.create(req.body);

        subuser.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Registration successfull.`,
            user: _.pick(subuser, [
                "_id",
                "name",
                "email",
                "role",
                "createdAt",
                "activated",
            ]),
        });
    }),
};
