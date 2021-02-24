/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const encrypt = require('../../helpers/passwordEncryption');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    profilePicUrl: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    type: {
      type: DataTypes.ENUM('user', 'client', 'verifier'),
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passwordResetToken: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    isLocalAuth: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    oauthId: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING(1000),
    },
  }, {
    tableName: 'users',
    underscored: true,
  });

  User.sync({
    force: false, // if true, it will drop the existing table
  }).then(() => true);

  return User;
};
