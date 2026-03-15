const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, categoryId, authorId } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.title = { [Op.like]: `%${search}%` };
    if (categoryId) where.categoryId = categoryId;
    if (authorId) where.authorId = authorId;

    const books = await Book.findAndCountAll({
      where,
      include: [
        { model: Author, attributes: ['id', 'firstName', 'lastName'] },
        { model: Category, attributes: ['id', 'name'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['title', 'ASC']]
    });

    res.status(200).json({
      total: books.count,
      page: parseInt(page),
      totalPages: Math.ceil(books.count / limit),
      data: books.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        { model: Author, attributes: ['id', 'firstName', 'lastName'] },
        { model: Category, attributes: ['id', 'name'] }
      ]
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// Create book
const createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, isbn, publishedYear, totalCopies, authorId, categoryId } = req.body;
    const book = await Book.create({
      title, isbn, publishedYear,
      totalCopies: totalCopies || 1,
      availableCopies: totalCopies || 1,
      authorId, categoryId
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create book', details: error.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const { title, isbn, publishedYear, totalCopies, authorId, categoryId } = req.body;
    await book.update({ title, isbn, publishedYear, totalCopies, authorId, categoryId });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update book', details: error.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
