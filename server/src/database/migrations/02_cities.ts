import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cities', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.integer('countryId')
      .unsigned()
      .references('id')
      .inTable('countries')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.string('cityName', 50).notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cities')
}

