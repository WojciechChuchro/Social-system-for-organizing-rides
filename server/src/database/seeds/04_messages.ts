import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { getFormattedDate } from '../fakerHelpers';

export async function seed(knex: Knex): Promise<void> {
  const messages = [];
  const numberOfMessages = 10;

  const existingDriverIds = await knex('users').pluck('id');
  const existingPassengerIds = await knex('users').pluck('id');

  for (let i = 0; i < numberOfMessages; i++) {
    messages.push({
      driverId: existingDriverIds[faker.number.int({ min: 0, max: 9 })],
      passengerId: existingPassengerIds[faker.number.int({ min: 0, max: 9 })],
      text: faker.lorem.sentence(5),
      sendTime: getFormattedDate(),
      wasRead: faker.number.int({ min: 0, max: 1 }),
    });
  }

  await knex('messages').del();
  await knex('messages').insert(messages);
}
