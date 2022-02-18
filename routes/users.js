const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { getAdmins } = require("../controllers/users");

router.get("/admins", auth, admin, getAdmins);

module.exports = router;
