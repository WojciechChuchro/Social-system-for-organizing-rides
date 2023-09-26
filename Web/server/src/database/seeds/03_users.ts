import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  const users = [];
  const numberOfUsers = 10;

  const existingCarsIds = await knex('cars').pluck('id');

  for (let i = 0; i < numberOfUsers; i++) {
    users.push({
      carId: existingCarsIds[faker.number.int({ min: 0, max: 9 })],
      email: faker.internet.email(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      phoneNumber: faker.phone.number('###-###-###'),
      profilePicture: faker.internet.avatar(),
      password: faker.internet.password(),
      salt: faker.number.int().toString(),
      sessionToken: faker.number.int().toString(),
    });
  }

  users.push({
    carId: existingCarsIds[faker.number.int({ min: 0, max: 9 })],
    email: "root@gmail.com",
    name: "root",
    surname: "root",
    phoneNumber: '123456789',
    profilePicture: faker.internet.avatar(),
    password: 'e664a81487c6df66eba27e14f9a0de04eddc5ddb114c4ac27cbb216f6732ae4d',
    salt: 'E56sVLEqLT6C5eVT+rB3iwiwr7lK4nYUb3E4e6Jps8NeKXrjraNxN7/zIGSLczEXgyjA5uXpP11gaxBRiwJ7gI0WHOyV50YSxxYVhtooZjKwvLwYz30Zw6oE2aJK0705IKO4pJsNBblhSOmOis611JH0661socI2yHRNy3yR3u4=',
    sessionToken: null,
  })

  await knex('users').del();
  await knex('users').insert(users);
}
