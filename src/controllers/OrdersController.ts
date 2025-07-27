import { Request, Response, NextFunction } from "express";
import { OrderRepository } from "../database/types/OrderRepository";
import { knex } from "../database/knex";
import { AppError } from "../utils/AppError";

export class OrdersController {

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await knex<OrderRepository>("orders");

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const result = await knex<OrderRepository>("orders").where({ id });

            if (!result) {
                throw new AppError("Pedido não existente !");
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}