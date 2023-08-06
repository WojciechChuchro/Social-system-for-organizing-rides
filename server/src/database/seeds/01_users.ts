import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    await knex("users").insert([
        { id: 1, email: "email1", password: "password1" },
        { id: 2, email: "email2", password: "password2" },
        { id: 3, email: "email3", password: "password3" }
    ]);
};
