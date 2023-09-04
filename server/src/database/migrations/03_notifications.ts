import {Knex} from 'knex'


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('notifications', (table: Knex.TableBuilder) => {
    table.increments('id')
      .primary()
    table.string('message', 255)
    table.tinyint('wasRead')
    table.integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notifications')
}

