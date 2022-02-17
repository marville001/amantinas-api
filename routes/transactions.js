const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    getTransactions,
    createTransaction,
} = require("../controllers/transactions");

const schemaValidator = require("../middlewares/schemaValidator");
const { createTransactionSchema } = require("../schemas/transaction");

router.get("/:investorId", auth, getTransactions);

router.post(
    "/",
    auth,
    schemaValidator(createTransactionSchema, "body"),
    createTransaction
);

module.exports = router;
