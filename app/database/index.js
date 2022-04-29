import connct from "mongoose";
const { connect } = connct;
import cron from "node-cron";
import config from "../config/index.js";
import { addMaterial } from "../controllers/products.controller.js";

const options = config.environment === "development" && {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default async function () {
  try {
    await connect(config.MONGO_URI, options);
    console.log("✅ Db Connected");

    // This will run at every 21st day of the month to fetch the updated data (if any)
    cron.schedule("0 0 21 * *", function () {
      console.log("---------------------");
      console.log("Running Cron Job");
      addMaterial();
    });
  } catch (error) {
    console.log(error);
  }
  return;
}
