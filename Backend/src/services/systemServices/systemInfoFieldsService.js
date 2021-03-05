const constants = require('../../../utils/constants');
const dataFieldDao = require('../../daos/dataField/dataField');

module.exports = {
  getInfoFieldsService: async (options) => {
    try {
      const data = await dataFieldDao.getDataFields(options);

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.DATAFIELDS_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  createInfoFieldService: async (field) => {
    try {
      field.isActive = true;
      const data = await dataFieldDao.createDataField(field);
      if (!data) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.DATAFIELDS_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  updateInfoFieldService: async (fieldName, updatedFields) => {
    try {
      const data = await dataFieldDao.updateField(fieldName, updatedFields);
      if (!data) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.DATAFIELDS_UPDATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};
