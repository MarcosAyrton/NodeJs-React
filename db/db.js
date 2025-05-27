const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('apinodejs', 'magg0759', 'asdsadas', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize
