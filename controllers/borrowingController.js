const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all borrowings
const getAllBorrowings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const where = status ? { status } : {};

    const borrowings = await Borrowing.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Book, attributes: ['id', 'title', 'isbn'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['borrowDate', 'DESC']]
    });

    res.status(200).json({
      total: borrowings.count,
      page: parseInt(page),
      totalPages: Math.ceil(borrowings.count / limit),
      data: borrowings.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch borrowings' });
  }
};

// Get borrowing by ID
const getBorrowingById = async (req, res) => {
  try {
    const borrowing = await Borrowing.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Book, attributes: ['id', 'title', 'isbn'] }
      ]
    });
    if (!borrowing) return res.status(404).json({ error: 'Borrowing not found' });
    res.status(200).json(borrowing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch borrowing' });
  }
};

// Create borrowing (emprunter un livre)
const createBorrowing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { userId, bookId, dueDate } = req.body;

    // Vérifier si le livre est disponible
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.availableCopies < 1) return res.status(400).json({ error: 'No copies available for this book' });

    const borrowing = await Borrowing.create({
      userId,
      bookId,
      borrowDate: new Date(),
      dueDate,
      status: 'active'
    });

    // Décrémenter les copies disponibles
    await book.update({ availableCopies: book.availableCopies - 1 });

    res.status(201).json(borrowing);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create borrowing', details: error.message });
  }
};

// Retourner un livre
const returnBook = async (req, res) => {
  try {
    const borrowing = await Borrowing.findByPk(req.params.id, {
      include: [{ model: Book }]
    });
    if (!borrowing) return res.status(404).json({ error: 'Borrowing not found' });
    if (borrowing.status === 'returned') return res.status(400).json({ error: 'Book already returned' });

    await borrowing.update({ returnDate: new Date(), status: 'returned' });

    // Incrémenter les copies disponibles
    await borrowing.Book.update({ availableCopies: borrowing.Book.availableCopies + 1 });

    res.status(200).json(borrowing);
  } catch (error) {
    res.status(400).json({ error: 'Failed to return book', details: error.message });
  }
};

// Update borrowing
const updateBorrowing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const borrowing = await Borrowing.findByPk(req.params.id);
    if (!borrowing) return res.status(404).json({ error: 'Borrowing not found' });

    const { dueDate, status } = req.body;
    await borrowing.update({ dueDate, status });
    res.status(200).json(borrowing);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update borrowing', details: error.message });
  }
};

// Delete borrowing
const deleteBorrowing = async (req, res) => {
  try {
    const borrowing = await Borrowing.findByPk(req.params.id);
    if (!borrowing) return res.status(404).json({ error: 'Borrowing not found' });
    await borrowing.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete borrowing' });
  }
};

module.exports = { getAllBorrowings, getBorrowingById, createBorrowing, returnBook, updateBorrowing, deleteBorrowing };
