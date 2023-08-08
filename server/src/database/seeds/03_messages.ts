import {Knex} from "knex";
import {faker} from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    const messages = [];
    const numberOfMessages = 10;


    const existingUserIds = await knex("users").pluck("id");

    for (let i = 0; i < numberOfMessages; i++) {
        messages.push({
            userRideId: faker.number.int(1),
            userId: existingUserIds[faker.number.int({min: 0, max: 10})],
            text: faker.lorem.sentence(5),
            sendTime: '2020-01-01 10:10:10',
            wasRead: faker.number.int({min: 0, max:1}),
            profilePicture: faker.internet.avatar(),
        });
    }

    await knex("messages").insert(messages);
}
