const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const where = status ? { status } : {};

    const reservations = await Reservation.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Book, attributes: ['id', 'title', 'isbn'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['reservationDate', 'DESC']]
    });

    res.status(200).json({
      total: reservations.count,
      page: parseInt(page),
      totalPages: Math.ceil(reservations.count / limit),
      data: reservations.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Book, attributes: ['id', 'title', 'isbn'] }
      ]
    });
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
};

// Create reservation
const createReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { userId, bookId, expiryDate } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const reservation = await Reservation.create({
      userId, bookId,
      reservationDate: new Date(),
      expiryDate,
      status: 'pending'
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create reservation', details: error.message });
  }
};

// Update reservation status
const updateReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });

    const { status, expiryDate } = req.body;
    await reservation.update({ status, expiryDate });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update reservation', details: error.message });
  }
};

// Delete reservation
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    await reservation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
};

module.exports = { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation };
