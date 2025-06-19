const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/productController");

router.get("/get", productController.getAllProducts);
router.post("/create", productController.createProduct);
router.get("/get/:id", productController.getProductById);
router.get(
  "/get/category/:categoryId",
  productController.getProductsByCategory
);
router.get("/get/seller/:sellerId", productController.getProductsBySellerId);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
