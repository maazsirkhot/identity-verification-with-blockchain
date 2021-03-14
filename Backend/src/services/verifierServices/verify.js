const verifier = require('../../daos/userFields/userFields');
const verificationEntity = require('../../daos/verificationEntity/verificationEntity');
const _ = require('lodash');

module.exports = {
  getAllUsersByVerifierDoc: async (idType) => {
    try {
      verifierData = await verifier.getAllUsersByVerifierDoc(idType);
      _.each(verifierData, (currentData) => {
        userAllDataFields = currentData.dataField;
        updatedUserAllDataFields = _.remove(userAllDataFields, (currentObject) => {
          return _.includes(idType, currentObject.verifierDoc.docshortName);
        });
        currentData.dataField = updatedUserAllDataFields;
      });
      return verifierData;
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  getVerifierById: async (verifierId) => {
    try {
      const verifierData = await verificationEntity.findVerifierById(verifierId);
      return verifierData.idtype;
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};
