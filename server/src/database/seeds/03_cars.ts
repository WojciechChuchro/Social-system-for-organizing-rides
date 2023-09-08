import {Knex} from 'knex'
import { faker } from '@faker-js/faker'
import {generatePolishCarRegistration} from '../fakerHelpers'

export async function seed(knex: Knex): Promise<void> {
  const cars = []
  const numberOfCars = 10

  const existingModelsIds = await knex('models').pluck('id')

  for (let i = 0; i < numberOfCars; i++) {
    cars.push({
      modelId: existingModelsIds[faker.number.int({min: 0, max: 9})],
      registrationNumber: generatePolishCarRegistration(),
    })
  }

  await knex('cars').del()
  await knex('cars').insert(cars)
}
