import { knex as knexConfig } from "knex";
import knexFileConfig from "../../knexfile";

export const knex = knexConfig(knexFileConfig);