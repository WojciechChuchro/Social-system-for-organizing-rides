import {Knex} from 'knex'
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  const statuses = []
  const numberOfStatus = 10

  for (let i = 0; i < numberOfStatus; i++) {
    statuses.push({
      isAccepted: faker.number.int({min: 0, max: 1}),
    })
  }

  await knex('statuses').del()
  await knex('statuses').insert(statuses)
}
