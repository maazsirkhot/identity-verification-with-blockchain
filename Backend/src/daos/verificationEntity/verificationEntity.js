const { Op } = require('sequelize');
const db = require('../../models/postgres/index');

module.exports = {
  findVerifierById: async (verifierId) => {
    try {
      return await db.verificationEntity.findOne({
        where: {
          id: verifierId,
        },
      });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
