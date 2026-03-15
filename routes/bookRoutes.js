const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

const bookValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('authorId').notEmpty().withMessage('Author is required'),
  body('categoryId').notEmpty().withMessage('Category is required')
];

router.get('/', authMiddleware, bookController.getAllBooks);
router.get('/:id', authMiddleware, bookController.getBookById);
router.post('/', authMiddleware, bookValidation, bookController.createBook);
router.put('/:id', authMiddleware, bookValidation, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
