import { Router } from 'express';
import { OrdersController } from "../controllers/OrdersController";

export const ordersRoutes = Router();

const ordersController = new OrdersController();

// TODO: aqui o USUARIO ira passar o NUMERO de uma MESA como QUERY PARAMS, e atraves do NUMERO da MESA eu vou buscar os PEDIDOS mais RECENTES em ABERTO, tera outro QUERY PARAM que se o usuario passar FALSE ou NAO PASSAR, SERA FALSE, ele sera o para VERIFICAR se e para BUSCAR TODOS os PEDIDOS, MESMO OS FECHADOS.
ordersRoutes.get("/", ordersController.index);

ordersRoutes.get("/:id", ordersController.show);

ordersRoutes.post("/:tablenumber", ordersController.create);