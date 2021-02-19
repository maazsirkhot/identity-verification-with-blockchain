const dataField = require('../../models/mongoDB/dataField');

module.exports = {
    createUserDetails: async (userDetails) => {
        try{
          return await userDetails.save();
        }catch (error) {
          // console.log(error);
          throw new Error('Error Occurred in DAO Layers: createUserDetails');
        }
    },
    findAllDataFields: async () => {
        try{
          return await dataField.find({});
        }catch (error) {
          // console.log(error);
          throw new Error('Error Occurred in DAO Layers: findAllDataFields');
        }
    }
}
