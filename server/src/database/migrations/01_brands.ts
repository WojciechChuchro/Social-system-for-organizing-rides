import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('brands', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table.string('brandName')
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('brands')
}

