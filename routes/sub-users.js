const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    getSubUsers, createSubUser, activateSubUser
} = require("../controllers/sub-users");
const schemaValidator = require("../middlewares/schemaValidator");
const { createSubUserSchema, activateSubUserSchema } = require("../schemas/sub-user");

router.get("/get/:investorId", auth, getSubUsers);

// Add sub user Route
router.post("/add", auth, schemaValidator(createSubUserSchema, "body"), createSubUser);
router.post("/activate/:token", schemaValidator(activateSubUserSchema, "body"),  activateSubUser);


module.exports = router;
