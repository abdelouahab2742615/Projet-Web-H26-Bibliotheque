const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING
  },
  birthDate: {
    type: DataTypes.DATEONLY
  },
  bio: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'authors',
  timestamps: true
});

module.exports = Author;
