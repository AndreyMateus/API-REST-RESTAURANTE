import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("sessions", (table) => {
        table.integer("id").primary();
        table.integer("table_id").notNullable().references("id").inTable("tables");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("sessions");
}