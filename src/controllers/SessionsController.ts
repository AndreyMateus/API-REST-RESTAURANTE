import { Request, Response, NextFunction } from "express";
import { knex } from "../database/knex";
import { TableRepository } from "../database/types/TableRepository";
import { AppError } from "../utils/AppError";
import { SessionRepository } from "../database/types/SessionRepository";

export class SessionsController {

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const allSessions = await knex("sessions");
            res.status(200).json(allSessions);
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

            const haveASessionOpen = await knex<SessionRepository>("sessions").where({
                table_id: tableExists.id
            }).orderBy("id", "desc").first();

            if (haveASessionOpen?.updated_at === null) {
                throw new AppError("Mesa não disponível no momento !", 409);
            }

            await knex<SessionRepository>("sessions").insert({
                table_id: tableExists.id
            });

            res.status(200).json({
                message: `Sessão aberta na mesa número: ${tableExists.number}`
            });
        } catch (error) {
            next(error);
        }
    }



}