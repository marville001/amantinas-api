const Admin = require("../models/Admin");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getAdmins: catchAsync(async (req, res) => {
        const admins = await Admin.find().select("-password");

        res.status(200).json({
            success: true,
            message: `Login Successfull.`,
            admins,
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
};
