const Category = require('../models/Category');

class categoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await Category.find();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }

    async createCategory(req, res) {
        try {
            const { categoryName } = req.body;
            const newCategory = new Category({
                categoryName
            });
            await newCategory.save();
            return res.status(201).json(newCategory);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }
}

module.exports = new categoryController();
