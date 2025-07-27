import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";

export function handlingErrorMiddleware(error: any, req: Request, res: Response, _: NextFunction) {

    if (error instanceof AppError) {
        const errorInstance: AppError = error;

        res.status(errorInstance.statusCode).json({
            message: errorInstance.message
        });
        return;
    }

    if (error instanceof ZodError) {
        const errorInstance: ZodError = error;

        res.status(500).json({
            message: errorInstance.message,
            errors: errorInstance.format()
        });
        return;
    }


    res.status(500).json({
        message: "Algo deu errado no servidor !"
    });
}