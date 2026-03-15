const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Book = require('./Book');

const Reservation = sequelize.define('Reservation', {
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
  reservationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'expired'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'reservations',
  timestamps: true
});

Reservation.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Reservation, { foreignKey: 'userId' });

Reservation.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(Reservation, { foreignKey: 'bookId' });

module.exports = Reservation;
