import { Model } from 'objection';
import knex from '../config/database';
import Users from './users.model';
import UserRides from '../models/userRides.model';

Model.knex(knex);

export class Messages extends Model {
  id!: number;
  passengerId!: number;
  driverId!: number;
  text!: string;
  sendTime!: string;
  wasRead!: number;

  static get messages() {
    return {
      required: ['id', 'passengerId', 'driverId', 'text', 'sendTime', 'wasRead'],
      properties: {
        id: { type: 'integer' },
        passengerId: { type: 'integer' },
        driverId: { type: 'integer' },
        text: { type: 'string', length: 255 },
        sendTime: { type: 'date-string' },
        wasRead: { type: 'number', length: 1 },
      },
    };
  }

  static get tableName(): string {
    return 'messages';
  }
  static get relationMappings() {
    return {
      driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'messages.driverId',
          to: 'users.id',
        },
      },
      passenger: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserRides,
        join: {
          from: 'messages.passengerId',
          to: 'userRides.id',
        },
      },
    };
  }

  static async getMessagesByDriverAndPassenger(driverId, passengerId) {
    try {
      const messages = await Messages.query()
        .where('driverId', driverId)
        .andWhere('passengerId', passengerId)
        .orderBy('sendTime', 'asc');

      return messages;
    } catch (error) {
      throw new Error('Error fetching messages: ' + error.message);
    }
  }

}

export default Messages;
