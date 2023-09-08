import {Knex} from 'knex'
import {faker} from '@faker-js/faker'
import {getFormattedDate} from '../fakerHelpers'

export async function seed(knex: Knex): Promise<void> {
  const lookingForDrivers = []
  const numberOfDrivers = 10

  const existingAddressesIds = await knex('addresses').pluck('id')

  for (let i = 0; i < numberOfDrivers; i++) {
    lookingForDrivers.push({
      startAddressId: existingAddressesIds[faker.number.int({min: 0, max: 9})],
      destinationAddressId: existingAddressesIds[faker.number.int({min: 0, max: 9})],
      earliestDepartureTime: getFormattedDate(),
      latestDepartureTime: getFormattedDate(),
      maxPrice: faker.number.float({min: 0, max: 100}),
      numberOfPeople: faker.number.int({min: 1, max: 4}),
    })
  }

  await knex('lookingForDrivers').del()
  await knex('lookingForDrivers').insert(lookingForDrivers)
}
