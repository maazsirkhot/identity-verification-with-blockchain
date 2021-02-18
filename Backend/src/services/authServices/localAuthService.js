const jwt = require('jsonwebtoken');
const userDao = require('../../daos/user/user');
const utilFunctions = require('../../helpers/utilFunctions');
const passwordEncryption = require('../../helpers/passwordEncryption');

module.exports = {
  createUserService: async (user) => {
    try {
      const reqAttributes = ['username', 'email', 'password', 'isClient'];
      if (!utilFunctions.validateAttributesInObject(user, reqAttributes)) {
        return false;
      }
      return await userDao.createUser(user);
    } catch (error) {
      // console.log(error);
      throw new Error('Error Occurred in Service Layers: createUserService');
    }
  },
  loginUserService: async (data) => {
    try {
      const result = await userDao.findUserByUsername(data.username);
      console.log(result[0].dataValues);
      if (result.length === 0) {
        return false;
      }
      const check = await passwordEncryption.compareHash(
        data.password,
        result[0].password,
      );
      if (!check) return false;
      return {
        token: jwt.sign(
          { username: result[0].dataValues.username, isClient: result[0].dataValues.isClient },
          'localAuth',
          { expiresIn: 7200 },
        ),
      };
    } catch (error) {
      // console.log(error);
      throw new Error('Error Occurred in Service Layers: loginUserService');
    }
  },
};
