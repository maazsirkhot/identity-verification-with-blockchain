const _ = require('lodash');
const Post = require('../../models/mongoDB/post');
const utilFunctions = require('../../helpers/utilFunctions');

module.exports = {
  getPost: async (options) => {
    try {
      return Post.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  createPost: async (post) => {
    try {
      if (
        !_.isPlainObject(post)
        || !utilFunctions.validateAttributesInObject(post, ['client', 'user', 'expiry', 'userDataFields', 'dataRequest'])
      ) {
        throw new Error('Parameters format is invalid.');
      }

      return new Post(post).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
