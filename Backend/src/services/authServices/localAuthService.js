/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const userDao = require('../../daos/user/user');
const utilFunctions = require('../../helpers/utilFunctions');
const passwordEncryption = require('../../helpers/passwordEncryption');
const constants = require('../../../utils/constants');

module.exports = {
  createUserService: async (user) => {
    try {
      const reqAttributes = [
        'username',
        'email',
        'password',
        'type',
        'isLocalAuth',
      ];
      if (!utilFunctions.validateAttributesInObject(user, reqAttributes)) {
        return false;
      }
      const hashedPassword = await passwordEncryption.createHash(user.password);
      user.password = hashedPassword;
      return await userDao.createUser(user);
    } catch (error) {
      // console.log(error);
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  loginUserService: async (data) => {
    try {
      const result = await userDao.findUserByUsername(data.username);
      console.log(result[0].dataValues);
      if (result.length === 0) {
        return {
          message: constants.MESSAGES.USER_NOT_EXIST,
          dataAvailable: false,
        };
      }
      const check = await passwordEncryption.compareHash(
        data.password,
        result[0].password,
      );
      if (!check) {
        return {
          message: constants.MESSAGES.USER_CREDENTIALS_INVALID,
          dataAvailable: false,
        };
      }
      const token = jwt.sign(
        {
          username: result[0].dataValues.username,
          type: result[0].dataValues.type,
          userId: result[0].dataValues.userId,
          email: result[0].dataValues.email,
        },
        'localAuth',
        { expiresIn: 7200 },
      );
      const addAccessToken = await userDao.addAccessToken(
        token,
        result[0].dataValues.email,
      );
      if (!addAccessToken) {
        return {
          message: constants.MESSAGES.USER_TOKEN_NOT_GENERATED,
          dataAvailable: false,
        };
      }
      return {
        message: constants.MESSAGES.LOGIN_SUCCESSFUL,
        data: { token, email: result[0].dataValues.email },
        dataAvailable: true,
      };
    } catch (error) {
      // console.log(error);
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};
