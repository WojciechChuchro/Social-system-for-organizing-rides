import {Knex} from "knex";
// @ts-ignore
import * as faker from "faker";

export async function seed(knex: Knex): Promise<void> {
    const users = [];
    const numberOfUsers = 10;

    for (let i = 0; i < numberOfUsers; i++) {
        users.push({
            email: faker.internet.email(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            phoneNumber: faker.phone.phoneNumber(),
            profilePicture: faker.internet.avatar(),
            password: faker.internet.password(),
            salt: faker.random.alphaNumeric(16),
            sessionToken: faker.datatype.uuid(),
        });
    }
    await knex("users").del();
    await knex("users").insert(users);
}
