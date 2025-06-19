const Cart = require("../models/Cart");

class cartController {
  async getAllCarts(req, res) {
    try {
      const carts = await Cart.find()
        .populate("userId")
        .populate("productId");
      return res.status(200).json(carts);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
  async createCart(req, res) {
    try {
      const { userId, productId, quantity } = req.body;
      const newCart = new Cart({
        userId,
        productId,
        quantity,
      });
      await newCart.save();
      return res.status(201).json(newCart);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
    async getCartByUserId(req, res) {
        try {
            const { userId } = req.params;
            const cart = await Cart.find({ userId })
                .populate("userId")
                .populate("productId");
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    }
    async deleteCart(req, res) {
        try {
            const { id } = req.params;
            const cart = await Cart.findByIdAndDelete(id);
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            return res.status(200).json({ message: "Cart deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    }
}

module.exports = new cartController();
