const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");
const { auth, role } = require("../middleware/authMiddleware");

router.get("/", auth, role("manager"), inventoryController.getInventory);
router.post("/", auth, role("manager"), inventoryController.addInventory);
router.patch("/:id", auth, role("manager"), inventoryController.updateInventory);
router.delete("/:id", auth, role("manager"), inventoryController.deleteInventory);

module.exports = router;
