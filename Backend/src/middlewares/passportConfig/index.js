const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('../../../bin/config');
const userDao = require('../../daos/user/user');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const oauthOpts = {
  clientID: config.GOOGLE_OAUTH2.CLIENT_ID,
  clientSecret: config.GOOGLE_OAUTH2.CLIENT_SECRET,
  callbackURL: config.GOOGLE_OAUTH2.CALLBACK_URL,
};

passport.use(
  new GoogleStrategy(
    oauthOpts,
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(accessToken);
        console.log(profile);
        const fetchUser = await userDao.findUserByOauthId(profile.id);
        if (fetchUser.length === 0) {
          const user = {
            email: profile.emails[0].value, // Complete address to the email in the profile object
            isLocalAuth: false,
            oauthId: profile.id,
            isVerified: true,
            token: accessToken,
          };
          const newUser = await userDao.createUser(user);
          if (!newUser) {
            return done(new Error('Error occurred with creating a user'), false);
          }
          return done(null, newUser);
        }
        const user = await userDao.addAccessToken(accessToken, profile.emails[0].value);
        if (!user) {
          return done(new Error('Error occurred with adding a token'), false);
        }
        fetchUser[0].dataValues.token = accessToken.toString();
        return done(null, fetchUser);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'localAuth';

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      if (jwtPayload.username) {
        const result = await userDao.findUserByUsername(jwtPayload.username);
        if (result.length === 0) {
          return done(null, false);
        }
        return done(null, result[0].dataValues);
      }
    } catch (error) {
      return done(error, false);
    }
    return done(null, false);
  }),
);
