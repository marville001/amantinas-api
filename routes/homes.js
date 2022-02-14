const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    getHomes, createProspect
} = require("../controllers/homes");
const schemaValidator = require("../middlewares/schemaValidator");
const { createProspectSchema } = require("../schemas/homes");

router.get("/:investorId", auth, getHomes);

// Add sub user Route
router.post("/prospects", auth, schemaValidator(createProspectSchema, "body"), createProspect);


module.exports = router;
