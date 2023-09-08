import {Knex} from 'knex'
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  const cities = []
  const numberOfCities = 10

  for (let i = 0; i < numberOfCities; i++) {
    cities.push({
      cityName: faker.location.city(),
    })
  }

  await knex('cities').del()
  await knex('cities').insert(cities)
}
