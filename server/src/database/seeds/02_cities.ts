import {Knex} from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    await knex("cities").del();

    const cities = [];
    const numberOfCities = 10;

    const existingCountriesIds = await knex("countries").pluck("id");

    for (let i = 0; i < numberOfCities; i++) {
        cities.push({
            cityName: faker.location.city(),
            countryId: existingCountriesIds[faker.number.int({min: 0, max: 9})],
        });
    }
    await knex("cities").insert(cities);
}
