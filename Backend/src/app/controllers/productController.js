const Product = require("../models/Product");

class productController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find()
        .populate("category")
        .populate("sellerId")
        .populate("image");
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createProduct(req, res) {
    try {
      const {
        productName,
        price,
        description,
        image,
        quantity,
        sellerId,
        category,
      } = req.body;
      const newProduct = new Product({
        productName,
        price,
        description,
        image,
        quantity,
        sellerId,
        category,
      });
      await newProduct.save();
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id)
        .populate("category")
        .populate("sellerId")
        .populate("image");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const products = await Product.find({ category: categoryId })
        .populate("category")
        .populate("sellerId")
        .populate("image");
      if (!products) {
        return res.status(404).json({ message: "Products not found" });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getProductsBySellerId(req, res) {
    try {
      const { sellerId } = req.params;
      const products = await Product.find({ sellerId })
        .populate("category")
        .populate("sellerId")
        .populate("image");
      if (!products) {
        return res.status(404).json({ message: "Products not found" });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        productName,
        price,
        description,
        image,
        quantity,
        sellerId,
        category,
      } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          productName,
          price,
          description,
          image,
          quantity,
          sellerId,
          category,
        },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
}

module.exports = new productController();
