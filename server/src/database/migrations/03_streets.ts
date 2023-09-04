import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('streets', (table: Knex.TableBuilder) => {
    table.increments('id').primary()

    table.integer('cityId')
      .unsigned()
      .references('id')
      .inTable('cities')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.string('streetName',50)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('streets')
}

