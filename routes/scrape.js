const router = require("express").Router();

const auth = require("../middlewares/auth");

const { createScrape, getScrapes } = require("../controllers/scrape");

const schemaValidator = require("../middlewares/schemaValidator");
const { createScrapeSchema } = require("../schemas/scrape");

router.get("/:investorId", auth, getScrapes);

router.post(
    "/",
    auth,
    schemaValidator(createScrapeSchema, "body"),
    createScrape
);

module.exports = router;
