const _ = require('lodash');
const DataField = require('../../models/mongoDB/dataField');
const utilFunctions = require('../../helpers/utilFunctions');

module.exports = {
  getDataFields: async (options) => {
    try {
      return DataField.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  createDataField: async (field) => {
    try {
      if (
        !_.isPlainObject(field)
        || utilFunctions.validateAttributesInObject(field, [
          'fieldName',
          'fieldAbstraction',
          'verificationEntities',
          'verificationMethod',
          'verificationAPI',
          'isActive',
        ])
      ) throw new Error('"field" is not an object');

      return new DataField(field).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  updateField: async (fieldName, updatedFields) => {
    try {
      if (!_.isPlainObject(updatedFields) || !fieldName) throw new Error('Parameters format is invalid.');
      console.log(fieldName, updatedFields);
      return DataField.findOneAndUpdate({ fieldName }, updatedFields, { new: true });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
};
