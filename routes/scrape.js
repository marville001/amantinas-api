const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    createScrape, getScrapes
} = require("../controllers/scrape");

router.get("/", auth, getScrapes);

// Add sub user Route
router.post("/", auth, createScrape);


module.exports = router;
