import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('notifications', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.string('message', 255).notNullable()
    table.tinyint('wasRead').notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notifications')
}

