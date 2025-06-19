const express = require('express')
const router = express.Router();
const cartController = require('../app/controllers/cartController')

router.get('/get', cartController.getAllCarts);
router.post('/create', cartController.createCart);
router.get('/get/:userId', cartController.getCartByUserId);
router.delete('/delete/:id', cartController.deleteCart);

module.exports = router;