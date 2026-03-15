const Review = require('../models/Review');
const Book = require('../models/Book');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, bookId } = req.query;
    const offset = (page - 1) * limit;

    const where = bookId ? { bookId } : {};

    const reviews = await Review.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Book, attributes: ['id', 'title'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      total: reviews.count,
      page: parseInt(page),
      totalPages: Math.ceil(reviews.count / limit),
      data: reviews.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Book, attributes: ['id', 'title'] }
      ]
    });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

// Create review
const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { userId, bookId, rating, comment } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const review = await Review.create({ userId, bookId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review', details: error.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    const { rating, comment } = req.body;
    await review.update({ rating, comment });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update review', details: error.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    await review.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = { getAllReviews, getReviewById, createReview, updateReview, deleteReview };
