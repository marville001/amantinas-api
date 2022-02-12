const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const {
    getAdminDetails,
    adminLogin,
    createAdmin,
} = require("../controllers/admin-auth");


router.get("/me", auth, admin, getAdminDetails);

// Login Route
router.post("/login", auth, admin, adminLogin);

// Register Route
router.post("/register", auth, createAdmin);

module.exports = router;
