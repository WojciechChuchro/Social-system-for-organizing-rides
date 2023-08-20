import {Knex} from 'knex'
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  await knex('countries').del()

  const countries = []
  const numberOfCountries = 10

  for (let i = 0; i < numberOfCountries; i++) {
    countries.push({
      countryName: faker.location.country(),
    })
  }
  await knex('countries').del()
  await knex('countries').insert(countries)
}
