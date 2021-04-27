/* eslint-disable radix */
const _ = require('lodash');
const utilFunctions = require('../../helpers/utilFunctions');
const DataRequest = require('../../models/mongoDB/dataRequest');

module.exports = {
  createDataRequest: async (dataRequest) => {
    try {
      if (!utilFunctions.validateAttributesInObject(dataRequest, ['client', 'user', 'fieldsRequested'])) {
        throw new Error('Parameters format is invalid.');
      }
      return new DataRequest(dataRequest).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  getRequest: async (options) => {
    try {
      return await DataRequest.find(options).lean();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  searchRequest: async (user, options, clientId) => {
    try {
      if (!utilFunctions.validateAttributesInObject(options, ['offset', 'limit'])) {
        throw new Error('Error Occurred in DAO Layers: Pagination options not provided');
      }
      user = user.trim();
      let count = 0;
      let result = null;
      if (user === '') {
        count = await DataRequest.find({ 'client.userId': clientId }).count();
        result = await DataRequest.find({ 'client.userId': clientId })
          .sort({ createdAt: 'desc' })
          .limit(parseInt(options.limit))
          .skip(options.limit * options.pageNumber);
      } else {
        count = await DataRequest.find(
          {
            $and:
            [
              {
                $or:
                [
                  { 'user.username': { $regex: user } },
                  { 'user.email': { $regex: user } },
                ],
              },
              {
                'client.userId': clientId,
              },
            ],
          },
        ).count();

        result = await DataRequest.find(
          {
            $and:
            [
              {
                $or:
                [
                  { 'user.username': { $regex: user } },
                  { 'user.email': { $regex: user } },
                ],
              },
              {
                'client.userId': clientId,
              },
            ],
          },
        )
          .sort({ createdAt: 'desc' })
          .limit(parseInt(options.limit))
          .skip(options.limit * options.pageNumber);
      }

      let numberOfPages = parseInt(count / options.limit);
      if (count % options.limit !== 0) {
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
  },
  updateDataRequest: async (options, updatedFields) => {
    try {
      if (!_.isPlainObject(updatedFields) || !_.isPlainObject(options)) {
        throw new Error('Parameters format is invalid.');
      }
      const data = await DataRequest.findOneAndUpdate(options, updatedFields, { new: true });
      console.log(data);
      return await DataRequest.findOneAndUpdate(options, updatedFields, { new: true });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
