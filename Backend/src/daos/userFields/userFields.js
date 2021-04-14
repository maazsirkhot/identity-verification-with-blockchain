const userFields = require('../../models/mongoDB/userFields');

module.exports = {
  getAllUsersByVerifierDoc: async (idType) => {
    try {
      return userFields
        .find({ 'dataField.verifierDoc.docshortName': idType })
        .sort({ createdAt: 'desc' });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },

  updateUserData: async (userDetails) => {
    try {
      return await userFields.findOneAndUpdate(
        {
          // eslint-disable-next-line no-underscore-dangle
          _id: userDetails._id,
          userId: userDetails.userId,
        },
        userDetails,
        { new: true },
      );
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  getUserFields: async (options) => {
    try {
      return await userFields.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
