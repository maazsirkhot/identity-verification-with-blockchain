const { Op } = require('sequelize');
const db = require('../../models/postgres/index');

module.exports = {
  createUser: async (user) => {
    try {
      return await db.User.create(user);
    } catch (error) {
      // console.log(error);
      throw new Error('Error Occurred in DAO Layers: createUser');
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
      throw new Error('Error Occurred in DAO Layers: findUserByUsername');
    }
  },
};
