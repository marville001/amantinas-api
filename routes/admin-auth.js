const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const {
    getAdminDetails,
    adminLogin,
    createAdmin,
} = require("../controllers/admin-auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema, registerSchema } = require("../schemas/auth");

router.get("/me", auth, admin, getAdminDetails);

// Login Route
router.post("/login", schemaValidator(loginSchema, "body"), adminLogin);

// Register Route
router.post(
    "/register",
    auth,
    schemaValidator(registerSchema, "body"),
    createAdmin
);

module.exports = router;
