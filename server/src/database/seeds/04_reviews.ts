import {Knex} from 'knex'
import {faker} from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  const reviews = []
  const numberOfReviews = 10

  const existingUserIds = await knex('users').pluck('id')

  for (let i = 0; i < numberOfReviews; i++) {
    reviews.push({
      comment: faker.lorem.sentence(10),
      rating: faker.number.int({min: 0, max: 4}),
      userId: existingUserIds[faker.number.int({min: 0, max: 9})],
    })
  }

  await knex('reviews').del()
  await knex('reviews').insert(reviews)
}
