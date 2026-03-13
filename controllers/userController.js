const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ['id', 'name']
        }
      ],
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Create a new user (Registration)
const createUser = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roleId
    });
    
    // Return user without password
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', details: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser
};
