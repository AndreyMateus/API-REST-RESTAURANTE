import { OrderRepository } from './../database/types/OrderRepository';
import { Request, Response, NextFunction } from "express";
import { knex } from "../database/knex";
import { AppError } from "../utils/AppError";
import z from 'zod';
import { TableRepository } from '../database/types/TableRepository';
import { ProductRepository } from '../database/types/ProductRepository';
import { SessionRepository } from '../database/types/SessionRepository';

export class OrdersController {

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const numbertable: number = Number(req.query.numbertable);
            // TODO: (opcao 2)atraves do NUMERO da MESA, pegar a ULTIMA mesa que tem o NUMERO passado, e atraves disso fazer o resto do codigo.
            // TODO: TESTAR -> buscar TODOS os PEDIDOS da MESA de NUMERO TAL (funcionando atraves do ID da mesa, modificar depois).

            if (numbertable) {
                // pegando a sessao ativa
                const sessionExists = await knex<SessionRepository>("sessions").where({
                    table_id: numbertable
                }).orderBy("id", "desc").first();

                if (!sessionExists) {
                    throw new AppError("Sessão não encontrada !");
                }

                const result = await knex("sessions")
                    .innerJoin("orders", "orders.sessionId", "sessions.id")
                    .where({
                        table_id: numbertable
                    });

                res.status(200).json(result);
                return;
            }

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

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const tablenumber = Number(req.params.tablenumber);

            const tableExists = await knex<TableRepository>("tables")
                .where({ number: tablenumber })
                .first();

            if (!tableExists) {
                throw new AppError("Mesa não encontrada !");
            }

            const sessionIsOpen = await knex<SessionRepository>("sessions")
                .where({ table_id: tableExists.id })
                .whereNull("updated_at").first();

            if (!sessionIsOpen) {
                throw new AppError("A Mesa não está disponível para aceitar pedidos no momento !");
            }

            const { body } = req;

            const bodySchemaValidation = z.object({
                productId: z.number({ required_error: "O ID de um produto se faz necessário !" }),
                quantity: z.number({ required_error: "A quantidade do produto se faz necessário !" })
            });

            const { productId, quantity } = bodySchemaValidation.parse(body);

            const productExists = await knex<ProductRepository>("products")
                .select("price")
                .where({ id: productId })
                .first();

            if (!productExists) {
                throw new AppError("Produto não existente !", 404);
            }

            const order: Partial<OrderRepository> = {
                productId,
                quantity,
                unit_price: productExists?.price,
                total_price: productExists.price * quantity,
                sessionId: sessionIsOpen.id
            };

            await knex("orders").insert(order);

            res.status(200).json({
                message: "O pedido foi criado !"
            });
        } catch (error) {
            next(error);
        }
    }
}