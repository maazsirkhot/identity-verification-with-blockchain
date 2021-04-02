const userFields = require('../../models/mongoDB/userFields');

module.exports = {
  getAllUsersByVerifierDoc: async (idType) => {
    try {
      return userFields.find( {"dataField.verifierDoc.docshortName":idType} )
        .sort({createdAt: "desc"});
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },

  updateUserData: async (userDetails) => {
    try{
      return await userFields.findOneAndUpdate( 
        {
          _id: userDetails._id, 
          userId: userDetails.userId
        }, userDetails, 
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
}
