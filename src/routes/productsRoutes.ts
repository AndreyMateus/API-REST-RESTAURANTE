import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

export const productsRoutes = Router();

const productsController = new ProductsController();

// TODO: permitir que seja passado um params com chave de name e que possa ser retornado somente um produto com esse NAME ou varios, entao ter tambem um params com nome ALOT, se esse param booleano for TRUE, entao eu retorno muitos com esse nome, caso contrario eu retorno um unico produto com esse name.
productsRoutes.get("/", productsController.index);

productsRoutes.get("/:id", productsController.show); 