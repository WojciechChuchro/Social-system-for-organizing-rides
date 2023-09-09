import {Knex} from 'knex'
import { faker } from '@faker-js/faker'
import {generateZipCode} from '../fakerHelpers'

export async function seed(knex: Knex): Promise<void> {
  const addresses = []
  const numberOfStreets = 10

  const existingStreetsIds = await knex('streets').pluck('id')

  for (let i = 0; i < numberOfStreets; i++) {
    addresses.push({
      zipCode: generateZipCode(),
      houseNumber: faker.location.buildingNumber(),
      streetId: existingStreetsIds[faker.number.int({min: 0, max: 9})],
    })
  }

  await knex('addresses').del()
  await knex('addresses').insert(addresses)
}
