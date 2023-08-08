import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reviews', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('comment')
        table.string('rating').notNullable();
        table.integer("user_id").unsigned().references("id").inTable("users");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('reviews');
}

