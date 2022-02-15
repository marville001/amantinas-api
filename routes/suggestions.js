const router = require("express").Router();

const auth = require("../middlewares/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { createSuggestionSchema } = require("../schemas/suggestion");

const {
    createSuggestion,
    getSuggestions,
} = require("../controllers/suggestions");

router.get("/", auth, getSuggestions);

// Add sub user Route
router.post(
    "/",
    auth,
    schemaValidator(createSuggestionSchema, "body"),
    createSuggestion
);

module.exports = router;
