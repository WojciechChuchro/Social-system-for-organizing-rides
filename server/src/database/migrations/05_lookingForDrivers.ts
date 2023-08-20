import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lookingForDrivers', (table: Knex.TableBuilder) => {
    table.increments('id').primary()

    table.integer('startAddressId')
      .unsigned()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('destinationAddressId')
      .unsigned()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.string('earliestDepartureTime')
    table.string('latestDepartureTime')
    table.float('maxPrice')
    table.integer('numberOfPeople')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('lookingForDrivers')
}

