const router = require("express").Router();

const {
    getUserDetails,
    loginInvestor,
    loginInvestorGoogle,
    loginInvestorFacebook,
    registerInvestor,
    registerInvestorGoogle,
    registerInvestorFacebook,
} = require("../controllers/auth");
const auth = require("../middlewares/auth");

router.get("/me", auth, getUserDetails);

// Login Routes
router.post("/login", auth, loginInvestor);
router.post("/login/google", auth, loginInvestorGoogle);
router.post("/login/facebook", auth, loginInvestorFacebook);

// Register Routes
router.post("/register", auth, registerInvestor);
router.post("/register/google", auth, registerInvestorGoogle);
router.post("/register/facebook", auth, registerInvestorFacebook);

module.exports = router;
