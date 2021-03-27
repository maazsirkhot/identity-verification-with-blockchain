const Post = require('../../models/mongoDB/post');

module.exports = {
  getPost: async (options) => {
    try {
      return Post.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
