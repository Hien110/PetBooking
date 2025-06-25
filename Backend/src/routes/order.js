const express = require('express')
const router = express.Router();
const orderController = require('../app/controllers/orderController')

router.get('/get', orderController.getAllOrders);
router.post('/create', orderController.createOrder);
router.get('/get/:id', orderController.getOrderById);
router.post('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.get('/product/:productId', orderController.getOrdersByProductId);
router.get('/product-seller/:sellerId', orderController.getOrderBySellerId);

module.exports = router;