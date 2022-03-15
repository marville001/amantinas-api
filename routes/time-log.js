const router = require("express").Router();

const auth = require("../middlewares/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { timeInSchema, timeOutSchema } = require("../schemas/time-log");
const { logTimeIn, getTimeLog, logTimeOut, getAllLogs } = require("../controllers/time-log");

router.get("/:userId", auth, getTimeLog);
router.get("/all/:userId", auth, getAllLogs);

router.post("/in/", auth, schemaValidator(timeInSchema, "body"), logTimeIn);
router.put("/out/:id", auth, schemaValidator(timeOutSchema, "body"), logTimeOut);

module.exports = router;
