const { options } = require('joi');
const utilFunctions = require('../../helpers/utilFunctions');
const DataRequest = require('../../models/mongoDB/dataRequest');

module.exports = {
  createDataRequest: async (dataRequest) => {
    try {
      if (!utilFunctions.validateAttributesInObject(dataRequest, ['creator', 'user', 'fieldsRequested'])) {
        throw new Error('Parameters format is invalid.');
      }
      return new DataRequest(dataRequest).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  getRequest: async (options) => {
    try {
      return DataRequest.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  searchRequest: async(user, options, creatorId) => {
    try {
      if (!utilFunctions.validateAttributesInObject(options, ['offset', 'limit'])) {
        throw new Error('Error Occurred in DAO Layers: Pagination options not provided');
      }

      const count = await DataRequest.find(
        {
          $and:
          [
            {
              $or: 
              [
                { "user.username":  { $regex: user }}, 
                { "user.email": {$regex: user}}
              ] 
            },
            {
              "creator.userId": creatorId
            }
          ]
        }
      ).count();
      
      const result = await DataRequest.find(
        {
          $and:
          [
            {
              $or: 
              [
                { "user.username":  { $regex: user }}, 
                { "user.email": {$regex: user}}
              ] 
            },
            {
              "creator.userId": creatorId
            }
          ]
        }
      )
      .sort({ createdAt : "desc" })
      .limit(parseInt(options.limit))
      .skip(options.limit * options.pageNumber);

      let numberOfPages = parseInt(count/options.limit);
      if (count%options.limit != 0){
        numberOfPages += 1;
      }

      return {
        count,
        result,
        numberOfPages,
      };
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  }
};
