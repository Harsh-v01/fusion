const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { auth, role } = require("../middleware/authMiddleware");

router.get("/", auth, productController.getProducts);
router.post("/", auth, role("manager"), productController.addProduct);
router.patch("/:id", auth, role("manager"), productController.updateProduct);
router.delete("/:id", auth, role("manager"), productController.deleteProduct);

module.exports = router;
