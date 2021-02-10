const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const userBlockchain = sequelize.define('userBlockchain', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blockchainKey: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'user_blockchain',
    underscored: true,
  });

  userBlockchain.sync({
    force: false, // if true, it will drop the existing table
  }).then(() => true);

  return userBlockchain;
};
