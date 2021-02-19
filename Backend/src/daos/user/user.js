const { Op } = require('sequelize');
const db = require('../../models/postgres/index');

module.exports = {
  createUser: async (user) => {
    try {
      return await db.User.create(user);
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  findUserByUsername: async (username) => {
    try {
      return await db.User.findAll({
        where: {
          [Op.and]: [{ username }, { isActive: true }],
        },
      });
    } catch (error) {
      // console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  findUserByOauthId: async (oauthId) => {
    try {
      return await db.User.findAll({
        where: {
          [Op.and]: [{ oauthId }, { isActive: true }],
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  addAccessToken: async (token, email) => {
    try {
      return await db.User.update(
        { token },
        {
          where: {
            email,
          },
        },
      );
    } catch (error) {
      console.log(error);
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};
