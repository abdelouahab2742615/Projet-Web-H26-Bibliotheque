const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Book = require('./Book');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Book, key: 'id' }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  comment: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'reviews',
  timestamps: true
});

Review.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

Review.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(Review, { foreignKey: 'bookId' });

module.exports = Review;
