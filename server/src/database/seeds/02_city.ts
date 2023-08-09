import {Knex} from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    await knex("city").del();

    const city = [];
    const numberOfCities = 10;

    const existingCountryIds = await knex("country").pluck("id");

    for (let i = 0; i < numberOfCities; i++) {
        city.push({
            cityName: faker.location.city(),
            countryId: existingCountryIds[faker.number.int({min: 0, max: 9})],
        });
    }
    await knex("city").del();
    await knex("city").insert(city);
}
