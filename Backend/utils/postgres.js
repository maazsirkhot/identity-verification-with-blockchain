const { Sequelize } = require('sequelize');
const config = require('../bin/config');

const connection = {
  host: config.DATABASE.POSTGRES.HOST,
  dialect: config.DATABASE.POSTGRES.DIALECT,
  port: config.DATABASE.POSTGRES.PORT,
  database: config.DATABASE.POSTGRES.DATABASE,
  user: config.DATABASE.POSTGRES.USER,
  password: config.DATABASE.POSTGRES.PASSWORD,
  max: 100, // up to 100 connections
};

const sequelize = new Sequelize(
  config.DATABASE.POSTGRES.DATABASE,
  config.DATABASE.POSTGRES.USER,
  config.DATABASE.POSTGRES.PASSWORD,
  connection,
);

module.exports = sequelize;
