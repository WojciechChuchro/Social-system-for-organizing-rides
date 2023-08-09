import {Knex} from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    await knex("street").del();

    const street = [];
    const numberOfStreets = 10;

    const existingCitiesIds = await knex("city").pluck("id");

    for (let i = 0; i < numberOfStreets; i++) {
        street.push({
            streetName: faker.location.street(),
            cityId: existingCitiesIds[faker.number.int({min: 0, max: 9})],
        });
    }
    await knex("street").del();
    await knex("street").insert(street);
}
