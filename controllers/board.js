const Board = require("../models/Board");
const BoardColumn = require("../models/BoardColumn");
const catchAsync = require("../utils/catchAsync");

const crypto = require("crypto");

module.exports = {
    getBoards: catchAsync(async (req, res) => {
        const { investorId } = req.query;
        const boards = await Board.find({ investorId });

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            boards,
        });
    }),
    getBoard: catchAsync(async (req, res) => {
        const { investorId } = req.query;
        const { boardId } = req.params;
        const boards = await Board.find({ investorId, _id: boardId });

        if (boards.length === 0)
            return res.status(200).json({
                success: true,
                message: `Successfull.`,
                board: {},
                columns: [],
            });

        const columns = await BoardColumn.find({ boardId });

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            board: boards[0],
            columns,
        });
    }),

    createBoard: catchAsync(async (req, res) => {
        const { investorId, name, columns } = req.body;
        const board = await Board.create(req.body);
        board.save({ validateBeforeSave: false });

        const { _id } = board;

        let columnsData = [];

        for (let i = 0; i < columns; i++) {
            const column = await BoardColumn.create({
                name: `Column ${i + 1}`,
                items: [],
                boardId: _id,
            });
            column.save({ validateBeforeSave: false });
            columnsData.push(column);
        }

        res.status(200).json({
            success: true,
            message: `Board Created successfully.`,
            board,
            columns: columnsData,
        });
    }),

    renameColumn: catchAsync(async (req, res) => {
        const { columnId } = req.params;
        let column = await BoardColumn.find({ _id: columnId });

        if (!column)
            return res
                .status(400)
                .send({ success: false, message: "Invalid column id" });

        column = await BoardColumn.findByIdAndUpdate(
            columnId,
            {
                $set: {
                    name: req.body.name,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            column,
        });
    }),

    createBoardColumnItem: catchAsync(async (req, res) => {
        let column = await BoardColumn.findById(req.body.columnId);

        if (!column)
            return res
                .status(400)
                .send({ success: false, message: "Invalid column id" });

        let imageLink = "";
        if (req.files && req.files.image) {
            const id = crypto.randomBytes(8).toString("hex");

            const { image } = req.files;
            imageLink = `${id + "_" + image.name}`;
            image.mv(`uploads/${imageLink}`);
        }

        const { title, description, columnId } = req.body;

        console.log(column);

        const items = [
            ...column.items,
            {
                title,
                image: imageLink,
                description,
            },
        ];

        column = await BoardColumn.findByIdAndUpdate(
            columnId,
            {
                $set: {
                    items,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            success: true,
            message: `Item Added successfully.`,
            column,
        });
    }),
};
