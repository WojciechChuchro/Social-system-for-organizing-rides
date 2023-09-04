import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').primary()
    table.integer('modelId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('models')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.string('email', 50).notNullable().unique()
    table.string('name', 20)
    table.string('surname',30)
    table.string('phoneNumber', 12)
    table.string('profilePicture', 100)
    table.string('password', 255).notNullable()
    table.string('salt',255)
    table.string('sessionToken', 16)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

