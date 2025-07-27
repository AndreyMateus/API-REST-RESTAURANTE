import { Router } from "express";
import { tablesRoutes } from "./tablesRoutes";
import { productsRoutes } from "./productsRoutes";
import { ordersRoutes } from "./ordersRoutes";

export const routes = Router();

routes.use("/tables", tablesRoutes);
routes.use("/products", productsRoutes);
routes.use("/orders", ordersRoutes);