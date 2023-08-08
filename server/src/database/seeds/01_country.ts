import {Knex} from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    await knex("country").del();

    const country = [];
    const numberOfCountry = 10;

    for (let i = 0; i < numberOfCountry; i++) {
        country.push({
            countryName: faker.location.country(),
        });
    }
    await knex("country").del();
    await knex("country").insert(country);
}
