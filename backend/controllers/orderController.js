const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");

exports.addOrder = async (req, res) => {
  try {
    const { items, payment_method } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Add at least one item" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product || !product.is_available) {
        return res.status(400).json({ message: "Product not found or unavailable" });
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      const lineTotal = product.price * item.quantity;
      total += lineTotal;
      orderItems.push({
        product_id: product._id,
        quantity: item.quantity,
        unit_price: product.price,
        line_total: lineTotal
      });
    }

    const order = await Order.create({
      user_id: req.user._id,
      subtotal: total,
      total_amount: total,
      payment_method: payment_method || "Other"
    });

    for (const item of orderItems) {
      item.order_id = order._id;
      await OrderItem.create(item);
    }

    res.status(201).json({ order, items: orderItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const filter = req.user.role === "manager" ? {} : { user_id: req.user._id };
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
