require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const orderController = require("./controllers/orderController");
const inventoryController = require("./controllers/inventoryController");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    app.get("/", (req, res) => {
      res.json({
        message: "FUSION backend is running"
      });
    });

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();