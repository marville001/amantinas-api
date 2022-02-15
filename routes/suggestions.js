const router = require("express").Router();

const auth = require("../middlewares/auth");

const schemaValidator = require("../middlewares/schemaValidator");
const { createSuggestionSchema, voteSchema } = require("../schemas/suggestion");

const {
    createSuggestion,
    getSuggestions,
    voteSuggestion,
} = require("../controllers/suggestions");

router.get("/", auth, getSuggestions);

router.post(
    "/",
    auth,
    schemaValidator(createSuggestionSchema, "body"),
    createSuggestion
);

router.put(
    "/vote",
    auth,
    schemaValidator(voteSchema, "body"),
    voteSuggestion
);

module.exports = router;
