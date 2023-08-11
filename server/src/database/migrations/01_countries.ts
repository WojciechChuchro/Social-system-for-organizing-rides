import {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('countries', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('countryName')
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('countries');
}

