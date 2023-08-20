import {Knex} from 'knex'
import {faker} from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  await knex('rides').del()

  const rides = []
  const numberOfRides = 10


  const existingUsersIds = await knex('users').pluck('id')
  const existingAddressesIds = await knex('addresses').pluck('id')

  for (let i = 0; i < numberOfRides; i++) {
    rides.push({
      driverId: existingUsersIds[faker.number.int({min: 0, max: 9})],
      destinationAddressId: existingAddressesIds[faker.number.int({min: 0, max: 9})],
      startAddressId: existingAddressesIds[faker.number.int({min: 0, max: 9})],
      earliestDepartureTime: '2020-01-01 10:10:10',
      latestDepartureTime: '2020-01-01 10:10:10',
      seatsNumber: faker.number.int({min: 1, max: 4}),
      registrationNumber: faker.lorem.word(1),
      pricePerPerson: faker.number.float({min: 0, max:10}),
    })
  }

  await knex('rides').insert(rides)
}
