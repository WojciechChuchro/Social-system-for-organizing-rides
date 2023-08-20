import { Knex } from 'knex'
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('userRides', (table: Knex.TableBuilder) => {
    table.increments('id').primary()

    table.integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('lookingForDriverId')
      .unsigned()
      .references('id')
      .inTable('lookingForDrivers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('rideId')
      .unsigned()
      .references('id')
      .inTable('rides')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('StatusId')
      .unsigned()
      .references('id')
      .inTable('statuses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('userRides')
}
