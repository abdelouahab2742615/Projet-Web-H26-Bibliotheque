const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Publisher = sequelize.define('Publisher', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'publishers',
    timestamps: true
});

module.exports = Publisher;
