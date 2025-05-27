const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
