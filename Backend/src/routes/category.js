const express = require('express')
const router = express.Router();
const categoryController = require('../app/controllers/categoryController')

router.get('/get', categoryController.getAllCategories);
router.post('/create', categoryController.createCategory);

module.exports = router;