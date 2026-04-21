const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "bibliotheque_db",
  "root",
  "1234",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;