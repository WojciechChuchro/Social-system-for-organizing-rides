import {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('email').notNullable().unique();
        table.string('name')
        table.string('surname')
        table.string('phoneNumber')
        table.string('profilePicture')
        table.string('password').notNullable();
        table.string('salt');
        table.string('sessionToken');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

