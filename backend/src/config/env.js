require('dotenv').config();

const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
};

module.exports = env;