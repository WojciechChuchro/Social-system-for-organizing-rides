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

    table.timestamp('earliestDepartureTime')
    table.timestamp('latestDepartureTime')
    table.float('maxPrice',2)
    table.integer('numberOfPeople',2)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('lookingForDrivers')
}

