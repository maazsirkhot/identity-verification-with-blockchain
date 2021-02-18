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
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicUrl: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isClient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
  }, {
    tableName: 'users',
    underscored: true,
  });

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await encrypt.createHash(user.password);
    user.password = hashedPassword;
  });

  User.sync({
    force: false, // if true, it will drop the existing table
  }).then(() => true);

  return User;
};
