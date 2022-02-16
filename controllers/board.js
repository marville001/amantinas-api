const Board = require("../models/Board");
const BoardColumn = require("../models/BoardColumn");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    getBoards: catchAsync(async (req, res) => {
        const { investorId } = req.body;
        const boards = await Board.find({ investorId });

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            boards,
        });
    }),
    getBoard: catchAsync(async (req, res) => {
        const { investorId } = req.body;
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
};
