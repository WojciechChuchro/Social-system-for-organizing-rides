import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('brands', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.string('brandName', 15).notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('brands')
}

