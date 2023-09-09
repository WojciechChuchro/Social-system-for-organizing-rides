import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.integer('driverId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.integer('passengerId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.string('text', 255).notNullable()
    table.timestamp('sendTime').notNullable()
    table.tinyint('wasRead').notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages')
}

