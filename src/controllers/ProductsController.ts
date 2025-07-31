import { ProductRepository } from "../database/types/ProductRepository";
import { Request, Response, NextFunction } from "express";
import { knex } from "../database/knex";
import { AppError } from "../utils/AppError";
import z from "zod";

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

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req;

            const nameSchemeValidation = z.string({ required_error: "O Produto deve ter um nome !" })
                .nonempty("O produto deve um nome com pelo menos uma letra !");
            const name = nameSchemeValidation.parse(body.name);

            const descriptionSchemeValidation = z.string({ required_error: "O produto deve conter uma descrição !" });
            const description = descriptionSchemeValidation.parse(body.description);

            const priceSchemeValidation = z.number({ required_error: "O produto deve conter um preço !" }).min(0, "O valor mínimo deve ser maior ou igual a 0!");
            const price = priceSchemeValidation.parse(body.price);

            await knex<ProductRepository>("products").insert({
                name,
                description,
                price,
            });

            res.status(201).json({
                message: "Produto cadastrado com sucesso!"
            });
        } catch (error) {
            next(error);
        }
    }
}