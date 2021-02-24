const dataField = require('../../models/mongoDB/dataField');
const idType = require('../../models/mongoDB/idType');
const userFields = require('../../models/mongoDB/userFields');

module.exports = {
  createUserDetails: async (userDetails) => {
    try {
      return await userDetails.save();
    } catch (error) {
    // console.log(error);
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  findAllDataFields: async () => {
    try {
      return await dataField.find({});
    } catch (error) {
    // console.log(error);
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  createDataFields: async (data) => {
    try {
      return await data.save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  findUserDetails: async (userId) => {
    try {
      return await userFields.find({ userId });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  findUserDetailsByEmail: async (email) => {
    try {
      return await userFields.find({ userEmail: email });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  createIdType: async (data) => {
    try {
      return await data.save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  getObjectIds: async (data) => {
    try {
      return await idType.find({}).where('shortName').in(data).select('name');
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
};