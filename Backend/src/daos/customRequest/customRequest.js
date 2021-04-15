const utilFunctions = require('../../helpers/utilFunctions');
const customRequest = require('../../models/mongoDB/customRequest');
const CustomRequest = require('../../models/mongoDB/customRequest');
const mongoose = require('mongoose');

module.exports = {
  createCustomRequest: async (customRequest) => {
    try {
      if (!utilFunctions.validateAttributesInObject(customRequest, ['client', 'fieldsAdded'])) {
        throw new Error('Parameters format is invalid.');
      }
      return new CustomRequest(customRequest).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  getCustomRequest: async (options) => {
    try {
      return CustomRequest.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  getCustomRequestByName: async (options) => {
    try {
      return CustomRequest.findOne(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  updateCustomRequest: async (options, customReqDetails) => {
    try{
      return await CustomRequest.findOneAndUpdate(options, customReqDetails, { new:true });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
