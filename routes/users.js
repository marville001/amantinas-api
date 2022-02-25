const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { getAdmins, deleteAdmin, getInvestors } = require("../controllers/users");

router.get("/admins", auth, admin, getAdmins);
router.get("/investors", auth, admin, getInvestors);
router.delete("/admins/:id", auth, admin, deleteAdmin);

module.exports = router;
