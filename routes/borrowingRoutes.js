const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const borrowingController = require('../controllers/borrowingController');
const authMiddleware = require('../middlewares/authMiddleware');

const borrowingValidation = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('dueDate').notEmpty().isDate().withMessage('Valid due date is required')
];

router.get('/', authMiddleware, borrowingController.getAllBorrowings);
router.get('/:id', authMiddleware, borrowingController.getBorrowingById);
router.post('/', authMiddleware, borrowingValidation, borrowingController.createBorrowing);
router.put('/:id/return', authMiddleware, borrowingController.returnBook);
router.put('/:id', authMiddleware, borrowingController.updateBorrowing);
router.delete('/:id', authMiddleware, borrowingController.deleteBorrowing);

module.exports = router;
