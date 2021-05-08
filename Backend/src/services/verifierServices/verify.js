const verifier = require('../../daos/userFields/userFields');
const verificationEntity = require('../../daos/verificationEntity/verificationEntity');
const _ = require('lodash');
const fetch = require('node-fetch');
const constants = require('../../../utils/constants');
const userFields = require('../../daos/userFields/userFields');
const https = require('https');
const axios = require('axios');

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

        userAllverifierApproval = currentData.verifierApproval;
        updatedUserAllverifierApproval = _.remove(userAllverifierApproval, (currentObject) => {
          return _.includes(idType, currentObject.idType);
        });
        const verifierApproval = {
          status : updatedUserAllverifierApproval[0].status,
          comment : updatedUserAllverifierApproval[0].comment,
          verifiedBy : updatedUserAllverifierApproval[0].verifiedBy,
          idType,
        }
        _.omit(currentData, ['verifierApproval']);
        currentData.verifierApproval = verifierApproval;

        userAllDocImages = currentData.docImage;
        updatedUserAllDocImages = _.remove(userAllDocImages, (currentObject) => {
          return _.includes(idType, currentObject.idType);
        });
        const docImages = {
          front : updatedUserAllDocImages[0].front,
          back : updatedUserAllDocImages[0].back,
          idType,
        }
        delete currentData['docImage'];
        currentData.docImage = docImages;
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
  updateUserData: async (userDetails, verifierId, walletId, idType) => {
    try {
      const userData = await userFields.getUserFields({userEmail: userDetails.userEmail}); 
      let userDataFields = userData[0].dataField;
      let userVerifierApproval = userData[0].verifierApproval;

      userDataFields = _.each(userDataFields, (currentData) => {
        if(currentData.verifierDoc.docshortName == idType) {
          currentData['dataReference'] = walletId;
          currentData['isVerified'] = true;
        }
      });
      userData[0].dataField = userDataFields;

      userVerifierApproval = _.each(userVerifierApproval, (currentData) => {
        if(currentData.idType == idType) {
          currentData['status'] = userDetails.verifierApproval[0].status;
          currentData['comment'] = userDetails.verifierApproval[0].comment;
          currentData.verifiedBy = verifierId;
        }
      });
      userData[0].verifierApproval = userVerifierApproval;

      return await verifier.updateUserData(userData[0]);
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  getWalletIdFromBlockchainService: async (userId, verifierId) => {
    try {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
      
      //const verfierData = await verificationEntity.findVerifierById(verifierId);
      
      // const blockchainResponseJson = await fetch(, {
      //   method: 'POST',
      //   body: blockchainData,
      //   agent: httpsAgent,
      // });
      
      //const blockchainResponseData = await fetch(, {method: 'POST', body: blockchainData});
      //const blockchainResponseJson = await blockchainResponseData.json();

      
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};
