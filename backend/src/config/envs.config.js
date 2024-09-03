import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_CODE: process.env.SECRET_CODE,
  EMAIL_CODE: process.env.EMAIL_CODE,
  EMAIL_USER: process.env.EMAIL_USER,
  ID_CLIENTE: process.env.ID_CLIENTE,
  ID_SECRECT_CODE: process.env.ID_SECRET_CODE,
  REFRESH_CODE: process.env.REFRESH_CODE,
  REDIRECT_URI: process.env.REDIRECT_URI,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};
