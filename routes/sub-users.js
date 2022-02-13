const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
    getSubUsers, createSubUser
} = require("../controllers/sub-users");
const schemaValidator = require("../middlewares/schemaValidator");
const { createSubUserSchema } = require("../schemas/sub-user");

router.get("/get", auth, getSubUsers);

// Add sub user Route
router.post("/add", auth, schemaValidator(createSubUserSchema, "body"), createSubUser);


module.exports = router;
