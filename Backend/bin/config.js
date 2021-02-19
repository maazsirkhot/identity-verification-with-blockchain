const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DATABASE: {
    MONGO: {
      USER: process.env.DB_MONGO_USER,
      PASSWORD: process.env.DB_MONGO_PASSWORD,
      CONN_URL: process.env.DB_MONGO_CONN_URL,
    },
    POSTGRES: {
      USER: process.env.DB_POSTGRES_USER,
      PASSWORD: process.env.DB_POSTGRES_PASSWORD,
      HOST: process.env.DB_POSTGRES_HOST,
      PORT: process.env.DB_POSTGRES_PORT,
      DATABASE: process.env.DB_POSTGRES_DATABASE,
      DIALECT: process.env.DB_POSTGRES_DIALECT,
    },
  },
  GOOGLE_OAUTH2: {
    CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENTID,
    CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENTSECRET,
    CALLBACK_URL: process.env.GOOGLE_OAUTH_CALLBACKURL,
  },
};
