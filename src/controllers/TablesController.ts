import { Request, Response, NextFunction } from "express";
import { knex } from "../database/knex";
import { Table } from "../database/types/Table";
import { AppError } from "../utils/AppError";
import { z } from "zod";

export class TablesController {

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await knex<Table>("tables");

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction) {
        try {
            const zodSchemaValidationNumberTable = z.number({ required_error: "número da mesa obrigatório !", message: "O valor precisa ser um número !" }).positive({ message: "O número da mesa precisa ser maior que zero !" });

            const number = zodSchemaValidationNumberTable.parse(Number(req.params.numberTable));

            const result = await knex<Table>("tables")
                .where({
                    number: +number
                }).first();

            if (!result) {
                throw new AppError("Mesa não encontrada !");
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const zodSchemaValidationNumberTable = z.number().positive();

            const number = zodSchemaValidationNumberTable.parse(req.body.number);

            const tableExists = await knex("tables").where({
                number
            }).first();

            if (tableExists) {
                throw new AppError("Já existe uma mesa cadastrada com esse número !", 409);
            }

            await knex<Table>("tables").insert({
                number
            });

            res.status(201).json({
                message: "Mesa cadastrada !"
            });
        } catch (error) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const zodSchemaValidationNumberTable = z.number().positive();

            const number = zodSchemaValidationNumberTable.parse(Number(req.params.numberTable));

            const tableExists = await knex<Table>("tables").where({
                number
            }).first();

            if (!tableExists) {
                throw new AppError("Mesa não existente !");
            }

            await knex<Table>("tables")
                .delete()
                .where({
                    number: tableExists.number
                });

            res.status(200).json({
                message: `Mesa de número:${number} removida !`
            });
        } catch (error) {
            next(error);
        }
    }
}