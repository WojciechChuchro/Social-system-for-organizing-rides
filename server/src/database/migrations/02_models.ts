import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('models', (table: Knex.TableBuilder) => {
    table.increments('id').primary()

    table.integer('brandId')
      .unsigned()
      .references('id')
      .inTable('brands')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.string('modelName', 30)

  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('models')
}
