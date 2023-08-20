import {Knex} from 'knex'
import {faker} from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  await knex('models').del()

  const models = []
  const numberOfBrands = 10


  const existingBrandIds = await knex('brands').pluck('id')

  for (let i = 0; i < numberOfBrands; i++) {
    models.push({
      modelName: faker.vehicle.model(),
      brandId: existingBrandIds[faker.number.int({min: 0, max: 9})],
    })
  }

  await knex('models').insert(models)
}
