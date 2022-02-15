const router = require("express").Router();

const auth = require("../middlewares/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { createSuggestionSchema, voteSchema, columnUpdateSchema } = require("../schemas/suggestion");

const {
    createSuggestion,
    getSuggestions,
    voteSuggestion,
    updateSuggestionColumn,
} = require("../controllers/suggestions");

router.get("/", auth, getSuggestions);

router.post(
    "/",
    auth,
    schemaValidator(createSuggestionSchema, "body"),
    createSuggestion
);

router.put("/vote", auth, schemaValidator(voteSchema, "body"), voteSuggestion);

router.put(
    "/column",
    auth,
    schemaValidator(columnUpdateSchema, "body"),
    updateSuggestionColumn
);

module.exports = router;
