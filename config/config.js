require("dotenv").config();

module.exports = {
  IS_PROD: process.env.NODE_ENV === 'production',
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  MONGO_URL: process.env.MONGO_URL,
  SESS_SECRET: process.env.SESS_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME,
};