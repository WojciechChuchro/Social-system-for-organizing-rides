import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  const notifications = [];
  const numberOfMessages = 10;

  const existingUserIds = await knex('users').pluck('id');

  for (let i = 0; i < numberOfMessages; i++) {
    notifications.push({
      userId: existingUserIds[faker.number.int({ min: 0, max: 9 })],
      message: faker.lorem.sentence(5),
      wasRead: faker.number.int({ min: 0, max: 1 }),
    });
  }

  await knex('notifications').del();
  await knex('notifications').insert(notifications);
}
