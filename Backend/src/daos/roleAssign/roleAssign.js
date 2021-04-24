const { Op } = require('sequelize');
const db = require('../../models/postgres/index');
const utilFunctions = require('../../helpers/utilFunctions');
const roleAssign = require('../../models/mongoDB/roleAssign');

module.exports = {
  createRoleAssign: async (user, client, role, userDataFields, requestId) => {
    try {
      ra = new roleAssign({
        user,
        client,
        role,
        userDataFields,
        requestId,
      });
      return await ra.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  findData: async (param) => {
    try {
      return await roleAssign.find(param);
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  deleteData: async (param) => {
    try {
      return await roleAssign.deleteOne(param);
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
