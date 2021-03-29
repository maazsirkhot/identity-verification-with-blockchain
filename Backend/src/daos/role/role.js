const _ = require('lodash');
const Role = require('../../models/mongoDB/role');
const utilFunctions = require('../../helpers/utilFunctions');

module.exports = {
  getRole: async (options) => {
    try {
      return Role.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  createRole: async (role) => {
    try {
      if (
        !_.isPlainObject(role)
        || !utilFunctions.validateAttributesInObject(role, ['roleName', 'createdBy', 'isActive', 'isDefault', 'permissions'])
      ) {
        throw new Error('Parameters format is invalid.');
      }

      if (utilFunctions.validateAttributesInObject(role.createdBy, ['type', 'id'])) {
        throw new Error('Parameters format is invalid.');
      }

      if (utilFunctions.validateArrayOfObjects(role.permissions, ['id', 'expireDurationInSecs'])) {
        throw new Error('Parameters format is invalid.');
      }
      return new Role(role).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  updateRole: async (options, updatedFields) => {
    try {
      if (!_.isPlainObject(updatedFields) || !_.isPlainObject(options)) {
        throw new Error('Parameters format is invalid.');
      }
      return Role.findOneAndUpdate(options, updatedFields, { new: true });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
