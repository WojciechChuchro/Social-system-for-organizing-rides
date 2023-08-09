import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('street', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('streetName')
        table.integer("cityId")
            .unsigned()
            .references("id")
            .inTable("city")
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('street');
}

