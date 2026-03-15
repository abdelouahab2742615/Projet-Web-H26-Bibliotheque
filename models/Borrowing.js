const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Book = require('./Book');

const Borrowing = sequelize.define('Borrowing', {
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
  borrowDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATEONLY
  },
  status: {
    type: DataTypes.ENUM('active', 'returned', 'overdue'),
    defaultValue: 'active'
  }
}, {
  tableName: 'borrowings',
  timestamps: true
});

Borrowing.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Borrowing, { foreignKey: 'userId' });

Borrowing.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(Borrowing, { foreignKey: 'bookId' });

module.exports = Borrowing;
