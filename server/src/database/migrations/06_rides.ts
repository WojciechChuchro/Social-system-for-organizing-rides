import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('rides', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.integer('driverId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.integer('startAddressId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.integer('destinationAddressId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamp('earliestDepartureTime').notNullable()
    table.timestamp('latestDepartureTime').notNullable()
    table.float('pricePerPerson', 8, 2).notNullable()
    table.integer('seatsNumber').notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('rides')
}

