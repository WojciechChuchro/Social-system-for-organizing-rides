import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { getFormattedDate } from '../fakerHelpers';

export async function seed(knex: Knex): Promise<void> {
  const rides = [];
  const numberOfRides = 10;

  const existingUsersIds = await knex('users').pluck('id');
  const existingAddressesIds = await knex('addresses').pluck('id');

  for (let i = 0; i < numberOfRides; i++) {
    rides.push({
      driverId: existingUsersIds[faker.number.int({ min: 0, max: 9 })],
      destinationAddressId:
        existingAddressesIds[faker.number.int({ min: 0, max: 9 })],
      startAddressId:
        existingAddressesIds[faker.number.int({ min: 0, max: 9 })],
      earliestDepartureTime: getFormattedDate(),
      latestDepartureTime: getFormattedDate(),
      seatsNumber: faker.number.int({ min: 1, max: 4 }),
      pricePerPerson: faker.number.float({ min: 0, max: 100 }),
    });
  }

  await knex('rides').del();
  await knex('rides').insert(rides);
}
