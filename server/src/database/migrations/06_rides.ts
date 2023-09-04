import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('rides', (table: Knex.TableBuilder) => {
    table.increments('id').primary()
    table.integer('driverId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('startAddressId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('destinationAddressId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('addresses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')


    table.timestamp('earliestDepartureTime')
    table.timestamp('latestDepartureTime')
    table.float('pricePerPerson',2)
    table.integer('seatsNumber')
    table.string('registrationNumber', 8)

  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('rides')
}

