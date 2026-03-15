const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

const reviewValidation = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

router.get('/', authMiddleware, reviewController.getAllReviews);
router.get('/:id', authMiddleware, reviewController.getReviewById);
router.post('/', authMiddleware, reviewValidation, reviewController.createReview);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
