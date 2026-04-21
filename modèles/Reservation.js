const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reservation = sequelize.define("Reservation", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateReservation: {
        type: DataTypes.DATE,
        allowNull: false
    },
    statut: {
        type: DataTypes.STRING
    }
});

module.exports = Reservation;
