const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const verificationEntity = sequelize.define('verificationEntity', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    verifierName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    dataFields: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    tableName: 'verification_entities',
    underscored: true,
  });

  verificationEntity.sync({
    force: false, // if true, it will drop the existing table
  }).then(() => true);

  return verificationEntity;
};
