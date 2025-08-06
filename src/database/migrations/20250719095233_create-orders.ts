import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("orders", (table) => {
        table.integer("id").primary();
        table.integer("productId").notNullable().references("id").inTable("products");
        table.integer("sessionId").notNullable().references("id").inTable("sessions");
        table.double("unit_price").notNullable();
        table.integer("quantity").notNullable();
        table.double("total_price").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("orders");
}