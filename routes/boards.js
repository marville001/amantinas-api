const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const schemaValidator = require("../middlewares/schemaValidator");
const {
    getBoardsSchema,
    createBoardSchema,
    renameColumnSchema,
    createBoardColumnItemSchema,
} = require("../schemas/board");

const {
    getBoards,
    getBoard,
    createBoard,
    renameColumn,
    createBoardColumnItem,
} = require("../controllers/board");

router.get("/", auth, schemaValidator(getBoardsSchema, "query"), getBoards);
router.get(
    "/:boardId",
    auth,
    schemaValidator(getBoardsSchema, "query"),
    getBoard
);

router.post("/", auth, schemaValidator(createBoardSchema, "body"), createBoard);

router.post(
    "/column/item",
    auth,
    schemaValidator(createBoardColumnItemSchema, "body"),
    createBoardColumnItem
);

router.put(
    "/column-name/:columnId",
    auth,
    schemaValidator(renameColumnSchema, "body"),
    renameColumn
);

module.exports = router;
