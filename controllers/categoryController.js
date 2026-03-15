const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const categories = await Category.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.status(200).json({
      total: categories.count,
      page: parseInt(page),
      totalPages: Math.ceil(categories.count / limit),
      data: categories.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

// Create category
const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create category', details: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const { name, description } = req.body;
    await category.update({ name, description });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update category', details: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
