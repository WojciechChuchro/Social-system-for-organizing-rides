import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.integer('carId')
      .unsigned()
      .references('id')
      .inTable('cars')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo(null)
      .nullable()
    table.string('email', 50).notNullable().unique()
    table.string('name', 20).notNullable()
    table.string('surname', 30).notNullable()
    table.string('phoneNumber', 12).notNullable().unique()
    table.string('profilePicture', 255).nullable().defaultTo('default')
    table.string('password', 255).notNullable().notNullable()
    table.string('salt', 255).notNullable()
    table.string('sessionToken', 255).nullable().defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

