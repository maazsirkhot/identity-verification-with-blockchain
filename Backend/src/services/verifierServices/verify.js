const verifier = require('../../daos/userFields/userFields');
const verificationEntity = require('../../daos/verificationEntity/verificationEntity');
const _ = require('lodash');
const fetch = require('node-fetch');
const constants = require('../../../utils/constants');

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
  updateUserData: async (userDetails, verifierId, walletId) => {
    try {
      userDetails.verifierApproval.verifiedBy = verifierId;
      const dataField = userDetails.dataField;
      _.each(dataField, (currentData) => {
        currentData['dataReference'] = walletId;
      });
      return await verifier.updateUserData(userDetails);
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  getWalletIdFromBlockchainService: async (userId, verifierId) => {
    try {
      const verfierData = await verificationEntity.findVerifierById(verifierId);
      const blockchainData = {
        userId,
        docType: verfierData.idtype,
        verifier: verfierData.idtype == 'CADL'?'DL Authority':'Passport Authority',
      }
      
      const blockchainResponseData = await fetch(constants.ENV_VARIABLES.BLOCKCHAIN_HOST + '/resources', {method: 'POST', body: blockchainData});
      const blockchainResponseJson = await blockchainResponseData.json();

      if (blockchainResponseJson.status == '200')
        return blockchainResponseJson.walletId;
      else
        return false;
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};
