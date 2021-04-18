const { Op } = require('sequelize');
const db = require('../../models/postgres/index');
const utilFunctions = require('../../helpers/utilFunctions');
const roleAssign = require('../../models/mongoDB/roleAssign');

module.exports = {
  createRoleAssign: async (user, client, role, userDataFields) => {
    try {
      ra = new roleAssign({
        user,
        client,
        role,
        userDataFields,
      });
      return await ra.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
