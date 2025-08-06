import { Router } from "express";
import { tablesRoutes } from "./tablesRoutes";
import { productsRoutes } from "./productsRoutes";
import { ordersRoutes } from "./ordersRoutes";
import { sessionsRoutes } from "./sessionRoutes";

export const routes = Router();

routes.use("/tables", tablesRoutes);
routes.use("/products", productsRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/sessions", sessionsRoutes);