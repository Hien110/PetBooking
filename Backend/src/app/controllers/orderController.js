const Order = require("../models/Order");

class orderController {
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find()
        .populate("productId")
        .populate("userId");
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createOrder(req, res) {
    try {
      const { products, userId, totalPrice, address, phone } = req.body;
      const newOrder = new Order({
        products,
        userId,
        totalPrice,
        address,
        phone,
      });
      await newOrder.save();
      return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.id)
        .populate("products.productId")
        .populate("userId");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async updateOrder(req, res) {
    try {
      const { address, phone } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { address, phone },
        { new: true }
      )
        .populate("products.productId")
        .populate("userId");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async deleteOrder(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getOrdersByUserId(req, res) {
    try {
      const orders = await Order.find({ userId: req.params.userId })
        .populate("products.productId")
        .populate("userId");
      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this user" });
      }
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getOrdersByProductId(req, res) {
    try {
      const orders = await Order.find({
        "products.productId": req.params.productId,
      })
        .populate("products.productId")
        .populate("userId");
      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this product" });
      }
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getOrderBySellerId(req, res) {
    try {
      const orders = await Order.find()
      .populate({
        path: "products.productId",
        select: "productName sellerId price image", // chỉ lấy những trường cần thiết
      })
      .populate("userId");

      const sellerId = req.params.sellerId; // Lấy sellerId từ tham số URL

      // Lọc các đơn hàng có ít nhất 1 sản phẩm thuộc seller đó
      const filteredOrders = orders.filter((order) =>
        order.products.some(
          (p) => p.productId && p.productId.sellerId.toString() === sellerId
        )
      );
      return res.status(200).json(filteredOrders);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
  async updateStatusOrder(req, res) {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      )
        .populate("products.productId")
        .populate("userId");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
}
module.exports = new orderController();
