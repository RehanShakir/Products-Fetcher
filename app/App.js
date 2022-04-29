import express from "express";
import bodyParser from "body-parser";
import path from "path";
import config from "./config/index.js";
import database from "./database/index.js";
import middlewares from "./middlewares/index.js";
import apiRouter from "./routes/routes.js";

// Initializing Express Application
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Running Middlewares
middlewares(app);

// Running API Routes
app.use("/api", apiRouter);

// Connecting To Database and Running Express Server
app.listen(config.PORT, () => {
  console.log("✓", `Listening on port ${config.PORT}`);
});
database();
