const { Op } = require('sequelize');
const db = require('../../models/postgres/index');
const utilFunctions = require('../../helpers/utilFunctions');

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
  findUserByEmail: async (email) => {
    try {
      return await db.User.findAll({
        where: {
          [Op.and]: [{ email }, { isActive: true }],
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
  searchUser: async (searchString, userType, options) => {
    try {
      if (!utilFunctions.validateAttributesInObject(options, ['offset', 'limit'])) {
        throw new Error('Error Occurred in DAO Layers: Pagination options not provided');
      }
      const count = db.User.count({
        attributes: ['userId', 'username', 'email', 'profilePicUrl'],
        where: {
          [Op.and]: [
            { isActive: true },
            { type: userType },
            {
              [Op.or]: [
                {
                  username: {
                    [Op.like]: `%${searchString}%`,
                  },
                },
                {
                  email: {
                    [Op.like]: `%${searchString}%`,
                  },
                },
              ],
            },
          ],
        },
      });
      const result = await db.User.findAll({
        attributes: ['userId', 'username', 'email', 'profilePicUrl'],
        limit: options.limit,
        offset: options.offset,
        where: {
          [Op.and]: [
            { isActive: true },
            { type: userType },
            {
              [Op.or]: [
                {
                  username: {
                    [Op.like]: `%${searchString}%`,
                  },
                },
                {
                  email: {
                    [Op.like]: `%${searchString}%`,
                  },
                },
              ],
            },
          ],
        },
      });
      numberOfPages = parseInt(count/limit);
      if(count%limit != 0){
        numberOfPages+=1;
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
  checkIfUserExists: async (username, email) => {
    return await db.User.findAll({
      where: {
        [Op.or]: [
          {
            username,
            email,
          },
        ],
      },
    });
  },
};
