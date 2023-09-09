import {Knex} from 'knex'
import {faker} from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  const users = []
  const numberOfUsers = 10

  const existingCarsIds = await knex('cars').pluck('id')

  for (let i = 0; i < numberOfUsers; i++) {
    users.push({
      carId: existingCarsIds[faker.number.int({min: 0, max: 9})],
      email: faker.internet.email(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      phoneNumber: faker.phone.number('###-###-###'),
      profilePicture: faker.internet.avatar(),
      password: faker.internet.password(),
      salt: faker.number.int().toString(),
      sessionToken: faker.number.int().toString(),
    })
  }

  await knex('users').del()
  await knex('users').insert(users)
}
