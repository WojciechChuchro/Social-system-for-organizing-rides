import {Knex} from "knex";
import {faker} from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    const reviews = [];
    const numberOfReviews = 10;


    const existingUserIds = await knex("users").pluck("id");

    for (let i = 0; i < numberOfReviews; i++) {
        reviews.push({
            comment: faker.lorem.sentence(10),
            rating: faker.number.int(1),
            userId: existingUserIds[faker.number.int({min: 0, max: 10})],
        });
    }

    await knex("reviews").insert(reviews);
}
