const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const schemaValidator = require("../middlewares/schemaValidator");
const {
    getBoardsSchema,
    createBoardSchema,
    renameColumnSchema,
    createBoardColumnItemSchema,
    updateBoardColumnItemSchema,
    updateBoardColumnItemDetailsSchema,
} = require("../schemas/board");

const {
    getBoards,
    getBoard,
    createBoard,
    renameColumn,
    createBoardColumnItem,
    deleteBoardColumnItem,
    updateBoardItemColumnPosition,
    updateBoardItemColumnDetails,
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
    "/column/item/position",
    auth,
    schemaValidator(updateBoardColumnItemSchema, "body"),
    updateBoardItemColumnPosition
);

router.put(
    "/column/item/details/:columnId",
    auth,
    schemaValidator(updateBoardColumnItemDetailsSchema, "body"),
    updateBoardItemColumnDetails
);

router.put(
    "/column-name/:columnId",
    auth,
    schemaValidator(renameColumnSchema, "body"),
    renameColumn
);

router.delete(
    "/column/:columnId/:itemId",
    auth,
    deleteBoardColumnItem
);



module.exports = router;
