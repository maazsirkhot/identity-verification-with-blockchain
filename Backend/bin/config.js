import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  DATABASE: {
    MONGO: {
      USER: process.env.DB_MONGO_USER,
      PASSWORD: process.env.DB_MONGO_PASSWORD,
      CONN_URL: process.env.DB_MONGO_CONN_URL,
    },
  },
};
