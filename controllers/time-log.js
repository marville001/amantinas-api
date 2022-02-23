const TimeLog = require("../models/TimeLog");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getTimeLog: catchAsync(async (req, res) => {
        if (!req.params.userId)
            return res.status(400).send({
                success: false,
                message: "Please provide user id",
            });
        const { userId } = req.params;
        const timelog = await TimeLog.find({ userId });
        // select expiclity password

        let today =  new Date(Date.now()).getDay();

        let log = timelog.find(t=>new Date(t.timeIn).getDay() === today)

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            timelog: log,
        });
    }),

    logTimeIn: catchAsync(async (req, res) => {
        const timelog = await TimeLog.create({
            timeIn: req.body.timeIn,
            userId: req.body.userId,
        });

        timelog.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Scrape Added successfully.`,
            timelog,
        });
    }),

    logTimeOut: catchAsync(async (req, res) => {
        if (!req.params.id)
            return res.status(400).send({
                success: false,
                message: "Please provide user id",
            });

        const timelog = await TimeLog.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    timeOut: req.body.timeOut,
                    work: req.body.work,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: `Scrape Added successfully.`,
            timelog,
        });
    }),
};
