const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Publisher = sequelize.define("Publisher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pays: {
        type: DataTypes.STRING
    },
    telephone: {
        type: DataTypes.STRING
    }
});

module.exports = Publisher;
