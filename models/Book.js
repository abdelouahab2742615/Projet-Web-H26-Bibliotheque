const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Author = require('./Author');
const Category = require('./Category');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true
  },
  publishedYear: {
    type: DataTypes.INTEGER
  },
  totalCopies: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  availableCopies: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: { model: Author, key: 'id' }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: { model: Category, key: 'id' }
  }
}, {
  tableName: 'books',
  timestamps: true
});

Book.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasMany(Book, { foreignKey: 'authorId' });

Book.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Book, { foreignKey: 'categoryId' });

module.exports = Book;
