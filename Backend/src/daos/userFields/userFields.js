const userFields = require('../../models/mongoDB/userFields');

module.exports = {
  getAllUsersByVerifierDoc: async (idType) => {
    try {
      return userFields.find( {"dataField.verifierDoc.docId":idType} );
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
}
