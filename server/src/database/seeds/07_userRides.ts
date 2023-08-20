import {Knex} from 'knex'
import {faker} from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  await knex('userRides').del()

  const userRides = []
  const numberOfUserRides = 10

  const existingStatusesIds = await knex('statuses').pluck('id')
  const existingUsersIds = await knex('users').pluck('id')
  const existingLookingForDriversIds = await knex('lookingForDrivers').pluck('id')
  const existingRidesIds = await knex('rides').pluck('id')

  for (let i = 0; i < numberOfUserRides; i++) {
    userRides.push({
      userId: existingUsersIds[faker.number.int({min: 0, max: 9})],
      rideId: existingRidesIds[faker.number.int({min: 0, max: 9})],
      statusId: existingStatusesIds[faker.number.int({min: 0, max: 9})],
      lookingForDriverId: existingLookingForDriversIds[faker.number.int({min: 0, max: 9})],
    })
  }

  await knex('userRides').insert(userRides)
}
