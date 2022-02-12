const router = require("express").Router();

// Middleware
const auth = require("../middlewares/auth");

// Controllers
const {
    getUserDetails,
    loginInvestor,
    loginInvestorGoogle,
    loginInvestorFacebook,
    registerInvestor,
    registerInvestorGoogle,
    registerInvestorFacebook,
} = require("../controllers/auth");

// Schema validators
const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema, registerSchema } = require("../schemas/auth");

router.get("/me", auth, getUserDetails);

// Login Routes
router.post("/login", schemaValidator(loginSchema, "body"), loginInvestor);
router.post("/login/google", loginInvestorGoogle);
router.post("/login/facebook", loginInvestorFacebook);

// Register Routes
router.post(
    "/register",
    schemaValidator(registerSchema, "body"),
    registerInvestor
);
router.post("/register/google", registerInvestorGoogle);
router.post("/register/facebook", registerInvestorFacebook);

module.exports = router;
