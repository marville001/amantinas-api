const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { getAdmins, deleteAdmin } = require("../controllers/users");

router.get("/admins", auth, admin, getAdmins);
router.delete("/admins/:id", auth, admin, deleteAdmin);

module.exports = router;
