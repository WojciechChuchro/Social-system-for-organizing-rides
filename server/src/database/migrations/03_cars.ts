import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable()
    table.integer('modelId')
      .unsigned()
      .references('id')
      .inTable('models')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    table.string('registrationNumber', 9).notNullable()
    table.string('color', 25).notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars')
}

