import {Knex} from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    await knex("addresses").del();

    const addresses = [];
    const numberOfStreets = 10;

    const existingStreetsIds = await knex("streets").pluck("id");

    for (let i = 0; i < numberOfStreets; i++) {
        addresses.push({
            zipCode: faker.location.zipCode(),
            houseNumber: faker.location.buildingNumber(),
            gpsX: faker.number.int({min: 0, max:10}),
            gpsY: faker.number.int({min: 0, max:10}),
            streetId: existingStreetsIds[faker.number.int({min: 0, max: 9})],
        });
    }

    await knex("addresses").insert(addresses);
}
