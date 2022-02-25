const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { getAdmins, deleteAdmin, getInvestors, deleteInvestor } = require("../controllers/users");

router.get("/admins", auth, admin, getAdmins);
router.delete("/admins/:id", auth, admin, deleteAdmin);

router.get("/investors", auth, admin, getInvestors);
router.delete("/investors/:id", auth, admin, deleteInvestor);

module.exports = router;
