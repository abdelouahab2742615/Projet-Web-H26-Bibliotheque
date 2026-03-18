const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const categoryValidation = [
  body('name').notEmpty().withMessage('Category name is required')
];

router.get('/', authMiddleware, categoryController.getAllCategories);
router.get('/:id', authMiddleware, categoryController.getCategoryById);
router.post('/', authMiddleware, categoryValidation, categoryController.createCategory);
router.put('/:id', authMiddleware, categoryValidation, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;
