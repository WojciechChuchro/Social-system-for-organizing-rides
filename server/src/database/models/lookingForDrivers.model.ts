import { Model } from 'objection';
import knex from '../config/database';
import userRides from './userRides.model';

Model.knex(knex);

export class LookingForDrivers extends Model {
  id!: number;
  startAddressId!: number;
  destinationAddressId!: number;
  earliestDepartureTime!: string;
  latestDepartureTime!: string;
  maxPrice!: number;
  numberOfPeople!: number;

  static get lookingForDrivers() {
    return {
      required: [
        'id',
        'startAddressId',
        'destinationAddressId',
        'latestDepartureTime',
        'maxPrice',
        'numberOfPeople',
      ],
      properties: {
        id: { type: 'integer' },
        startAddressId: { type: 'integer' },
        destinationAddressId: { type: 'integer' },
        earliestDepartureTime: { type: 'date-string' },
        latestDepartureTime: { type: 'date-string' },
        maxPrice: { type: 'float', length: 2 },
        numberOfPeople: { type: 'integer', length: 2 },
      },
    };
  }

  static get tableName(): string {
    return 'lookingForDrivers';
  }

  static get relationMappings() {
    return {
      userRide: {
        relation: Model.HasManyRelation,
        modelClass: userRides,
        join: {
          from: 'lookingForDrivers.id',
          to: 'userRides.id',
        },
      },
    };
  }
  static async getAllLookingForDrivers() {
    try {
      return await LookingForDrivers.query()
    } catch (error) {
      throw new Error('Error fetching looking for drivers: ' + error.message);
    }
  }
}

export default LookingForDrivers;
