import { Router } from "express";
import { SessionsController } from "../controllers/SessionsController";

export const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.get("/", sessionsController.index);

sessionsRoutes.post("/:tablenumber", sessionsController.create);