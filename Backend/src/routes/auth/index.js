const localAuth = require('./localAuth');
const googleAuth = require('./googleAuth');
const facebookAuth = require('./facebookAuth');

module.exports = (app) => {
  app.use('/local', localAuth);
  app.use('/google', googleAuth);
  app.use('/facebook', facebookAuth);
};
