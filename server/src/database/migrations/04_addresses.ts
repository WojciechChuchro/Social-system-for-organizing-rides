import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addresses', (table: Knex.TableBuilder) => {
    table.increments('id').primary()

    table.integer('streetId')
      .unsigned()
      .references('id')
      .inTable('streets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.string('zipCode', 6)
    table.string('houseNumber', 7)
    table.float('gpsX', 9)
    table.float('gpsY', 9)

  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addresses')
}

