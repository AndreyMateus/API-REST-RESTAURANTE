import { Router } from "express";
import { TablesController } from "../controllers/TablesController";

export const tablesRoutes = Router();

const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);
tablesRoutes.get("/:numberTable", tablesController.show);
tablesRoutes.post("/", tablesController.create);
tablesRoutes.delete("/:numberTable", tablesController.remove);