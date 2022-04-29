import { Router } from "express";
import { getAllData } from "../controllers/products.controller.js";

const router = Router();

router.get("/all", getAllData);

export default router;
