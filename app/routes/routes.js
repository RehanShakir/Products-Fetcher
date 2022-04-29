import { Router } from "express";
import { productsRoutes } from "./index.js";

const router = Router();
/**
 * Product base route
 */

router.use("/products", productsRoutes);

export default router;
