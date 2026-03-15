const Author = require('../models/Author');
const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    const { Op } = require('sequelize');

    const where = search
      ? { [Op.or]: [{ firstName: { [Op.like]: `%${search}%` } }, { lastName: { [Op.like]: `%${search}%` } }] }
      : {};

    const authors = await Author.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['lastName', 'ASC']]
    });

    res.status(200).json({
      total: authors.count,
      page: parseInt(page),
      totalPages: Math.ceil(authors.count / limit),
      data: authors.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};

// Get author by ID
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: [{ model: Book, attributes: ['id', 'title', 'publishedYear'] }]
    });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author' });
  }
};

// Create author
const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { firstName, lastName, nationality, birthDate, bio } = req.body;
    const author = await Author.create({ firstName, lastName, nationality, birthDate, bio });
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create author', details: error.message });
  }
};

// Update author
const updateAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const { firstName, lastName, nationality, birthDate, bio } = req.body;
    await author.update({ firstName, lastName, nationality, birthDate, bio });
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update author', details: error.message });
  }
};

// Delete author
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    await author.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
