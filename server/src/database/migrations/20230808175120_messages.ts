import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('messages', (table: Knex.TableBuilder) => {
        table.increments('id')
            .primary();
        table.string('text');
        table.timestamp('sendTime');
        table.tinyint("wasRead");
        table.string('profilePicture');
        table.integer('userRideId')
        table.integer("userId")
            .unsigned()
            .references("id")
            .inTable("users")
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('messages');
}

