const { Sequelize } = require('sequelize');
const config = require('../bin/config');

const connection = {
  host: config.DATABASE.POSTGRES.HOST,
  dialect: config.DATABASE.POSTGRES.DIALECT,
  port: config.DATABASE.POSTGRES.PORT,
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
  logging: false,
};

const sequelize = new Sequelize(
  config.DATABASE.POSTGRES.DATABASE,
  config.DATABASE.POSTGRES.USER,
  config.DATABASE.POSTGRES.PASSWORD,
  connection,
);

module.exports = sequelize;
