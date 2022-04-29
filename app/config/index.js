import cg from "dotenv";
const { config } = cg;
config();
export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  environment: process.env.NODE_ENV,
};
