import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('countries', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.string('countryName', 30).notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('countries')
}

