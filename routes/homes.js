const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    getHomes, createProspect, updateProspect, deleteProspect, getScrapedHomes
} = require("../controllers/homes");
const schemaValidator = require("../middlewares/schemaValidator");
const { createProspectSchema } = require("../schemas/homes");

router.get("/:investorId", auth, getHomes);
router.get("/scraped/:investorId", auth, getScrapedHomes);

router.post("/prospects", auth, schemaValidator(createProspectSchema, "body"), createProspect);
router.put("/:homeId", auth, updateProspect);
router.delete("/:homeId", auth, deleteProspect);


module.exports = router;
