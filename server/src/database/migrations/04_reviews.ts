import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reviews', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable();
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
    table.string('comment').nullable();
    table.integer('rating', 1).notNullable();
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reviews');
}
