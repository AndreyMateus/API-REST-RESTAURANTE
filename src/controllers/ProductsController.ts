import { ProductRepository } from "../database/types/ProductRepository";
import { Request, Response, NextFunction } from "express";
import { knex } from "../database/knex";
import { AppError } from "../utils/AppError";

export class ProductsController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await knex<ProductRepository>("products");

            if (!result) {
                throw new AppError("Um erro ocorreu ao buscar os produtos !");
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const productExists = await knex<ProductRepository>("products").where({
                id
            }).first();

            if (!productExists) {
                throw new AppError("Produto não existente !", 404);
            }

            res.status(200).json(productExists);
        } catch (error) {
            next(error);
        }

    }
}