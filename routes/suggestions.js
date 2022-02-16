const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const schemaValidator = require("../middlewares/schemaValidator");
const {
    createSuggestionSchema,
    voteSchema,
    columnUpdateSchema,
} = require("../schemas/suggestion");

const {
    createSuggestion,
    getSuggestions,
    voteSuggestion,
    updateSuggestionColumn,
    deleteSuggestion,
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

router.delete("/", auth,admin, deleteSuggestion);

module.exports = router;
