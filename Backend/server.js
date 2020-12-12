import express from 'express';
import mongoose from 'mongoose';
import config from './bin/config.js';

const app = express();

mongoose
  .connect(config.DATABASE.MONGO.CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 100,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.listen(config.PORT, () => {
  console.log(`Server Listening on port ${config.PORT}`);
});
