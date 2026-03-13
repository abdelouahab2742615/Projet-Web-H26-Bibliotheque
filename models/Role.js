const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomRole: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    tableName: "roles",
    timestamps: false
  }
);

console.log("Role model chargé ->", Role.getTableName());

module.exports = Role;