const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const schemaValidator = require("../middlewares/schemaValidator");
const { getBoardsSchema, createBoardSchema } = require("../schemas/board");

const { getBoards,getBoard, createBoard } = require("../controllers/board");

router.get("/", auth,  schemaValidator(getBoardsSchema, "query"), getBoards);
router.get("/:boardId", auth,  schemaValidator(getBoardsSchema, "query"), getBoard);

router.post("/", auth, schemaValidator(createBoardSchema, "body"), createBoard);

module.exports = router;
