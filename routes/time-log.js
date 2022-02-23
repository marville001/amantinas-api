const router = require("express").Router();

const auth = require("../middlewares/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { timeInSchema, timeOutSchema } = require("../schemas/time-log");
const { logTimeIn, getTimeLog, logTimeOut } = require("../controllers/time-log");

router.get("/:userId", auth, getTimeLog);

router.post("/in/", auth, schemaValidator(timeInSchema, "body"), logTimeIn);
router.post("/out/:id", auth, schemaValidator(timeOutSchema, "body"), logTimeOut);

module.exports = router;
