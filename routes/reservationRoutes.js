const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

const reservationValidation = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('expiryDate').notEmpty().isDate().withMessage('Valid expiry date is required')
];

router.get('/', authMiddleware, reservationController.getAllReservations);
router.get('/:id', authMiddleware, reservationController.getReservationById);
router.post('/', authMiddleware, reservationValidation, reservationController.createReservation);
router.put('/:id', authMiddleware, reservationController.updateReservation);
router.delete('/:id', authMiddleware, reservationController.deleteReservation);

module.exports = router;
