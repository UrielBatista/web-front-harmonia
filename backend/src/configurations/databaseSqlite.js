const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database\\pessoas.db',
});

module.exports = { sequelize };