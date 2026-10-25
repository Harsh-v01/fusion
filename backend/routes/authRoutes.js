const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { auth, role } = require("../middleware/authMiddleware");

router.post("/login", authController.login);
router.post("/users", auth, role("manager"), authController.register);

module.exports = router;
