const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    getHomes, createProspect, updateProspect
} = require("../controllers/homes");
const schemaValidator = require("../middlewares/schemaValidator");
const { createProspectSchema } = require("../schemas/homes");

router.get("/:investorId", auth, getHomes);

router.post("/prospects", auth, schemaValidator(createProspectSchema, "body"), createProspect);
router.put("/:homeId", auth, updateProspect);


module.exports = router;
