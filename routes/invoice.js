const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    getInvoices,
    createInvoice,
} = require("../controllers/invoice");

const schemaValidator = require("../middlewares/schemaValidator");
const { createInvoiceSchema } = require("../schemas/invoice");

router.get("/:investorId", auth, getInvoices);

router.post(
    "/",
    auth,
    schemaValidator(createInvoiceSchema, "body"),
    createInvoice
);

module.exports = router;
