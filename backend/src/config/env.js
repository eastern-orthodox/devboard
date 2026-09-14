const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  PORT: parseInt(process.env.PORT, 10),
  NODE_ENV: process.env.NODE_ENV,
  
  ...process.env,
};