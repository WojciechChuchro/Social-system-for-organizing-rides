import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  const streets = [];
  const numberOfStreets = 10;

  const existingCitiesIds = await knex('cities').pluck('id');

  for (let i = 0; i < numberOfStreets; i++) {
    streets.push({
      streetName: faker.location.street(),
      cityId: existingCitiesIds[faker.number.int({ min: 0, max: 9 })],
    });
  }

  await knex('streets').del();
  await knex('streets').insert(streets);
}
