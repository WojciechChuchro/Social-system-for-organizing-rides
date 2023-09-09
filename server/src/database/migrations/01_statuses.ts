import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('statuses', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.tinyint('isAccepted').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('statuses')
}

