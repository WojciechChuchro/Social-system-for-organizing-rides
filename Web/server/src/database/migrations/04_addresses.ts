import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addresses', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable();
    table
      .integer('streetId')
      .unsigned()
      .references('id')
      .inTable('streets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE').notNullable;
    table.string('zipCode', 9).notNullable;
    table.string('houseNumber', 7).notNullable;
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addresses');
}
