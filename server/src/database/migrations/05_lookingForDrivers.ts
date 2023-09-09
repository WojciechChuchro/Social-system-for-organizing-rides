import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lookingForDrivers', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.integer('startAddressId')
      .unsigned()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.integer('destinationAddressId')
      .unsigned()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamp('earliestDepartureTime').notNullable()
    table.timestamp('latestDepartureTime').notNullable()
    table.float('maxPrice', 8, 2).notNullable()
    table.integer('numberOfPeople', 2).notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('lookingForDrivers')
}

