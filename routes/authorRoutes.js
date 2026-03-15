const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middlewares/authMiddleware');

const authorValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required')
];

router.get('/', authMiddleware, authorController.getAllAuthors);
router.get('/:id', authMiddleware, authorController.getAuthorById);
router.post('/', authMiddleware, authorValidation, authorController.createAuthor);
router.put('/:id', authMiddleware, authorValidation, authorController.updateAuthor);
router.delete('/:id', authMiddleware, authorController.deleteAuthor);

module.exports = router;
