import {Knex} from 'knex'
import {faker} from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  await knex('brands').del()

  const brands = []
  const numberOfBrands = 10

  for (let i = 0; i < numberOfBrands; i++) {
    brands.push({
      brandName: faker.vehicle.model(),
    })
  }

  await knex('brands').insert(brands)
}
