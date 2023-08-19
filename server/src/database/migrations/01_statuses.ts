import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('statuses', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table.tinyint('isAccepted')
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('statuses')
}

