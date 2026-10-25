const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { auth, role } = require("../middleware/authMiddleware");

router.post("/", auth, role("manager", "cashier"), orderController.addOrder);
router.get("/", auth, orderController.getOrders);
router.patch("/:id/status", auth, role("manager", "barista"), orderController.updateStatus);

module.exports = router;
