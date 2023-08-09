import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('city', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('cityName')
        table.integer("countryId")
            .unsigned()
            .references("id")
            .inTable("country")
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('city');
}

