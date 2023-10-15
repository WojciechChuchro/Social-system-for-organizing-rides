import { Model } from 'objection';
import knex from '../config/database';
import Addresses from './addresses.model';
import { StreetIds } from '../../types/model';
import Cities from './cities.model';

Model.knex(knex);

class Streets extends Model {
  id!: number;
  cityId!: number;
  streetName!: string;

  static get Streets() {
    return {
      required: ['id', 'cityId', 'streetName'],
      properties: {
        id: { type: 'integer' },
        cityId: { type: 'integer' },
        streetName: { type: 'string', length: 50 },
      },
    };
  }

  static get relationMappings() {
    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cities,
        join: {
          from: 'streets.cityId',
          to: 'cities.id',
        },
      },
      address: {
        relation: Model.HasManyRelation,
        modelClass: Addresses,
        join: {
          from: 'streets.id',
          to: 'addresses.streetId',
        },
      },
    };
  }

  static get tableName(): string {
    return 'streets';
  }
}

export const createStartAndDestinationStreet = async (
  startStreetName: string,
  destinationStreetName: string | null,
  startCityId: number,
  destinationCityId: number | null,
): Promise<StreetIds> => {
  const streetIds: StreetIds = {
    startStreetId: -1,
    destinationStreetId: -1,
  };

  try {
    // Process start street
    const existingStartStreet = await Streets.query().findOne({
      streetName: startStreetName,
    });

    if (!existingStartStreet) {
      const newStartStreet = await Streets.query().insert({
        streetName: startStreetName,
        cityId: startCityId,
      });
      streetIds.startStreetId = newStartStreet.id;
    } else {
      streetIds.startStreetId = existingStartStreet.id;
    }

    // Process destination street only if destinationStreetName is provided
    // if (destinationStreetName && destinationCityId !== null) {
    //   const existingDestStreet = await Streets.query().findOne({
    //     streetName: destinationStreetName,
    //   });

      // if (!existingDestStreet) {
        const newDestStreet = await Streets.query().insert({
          streetName: destinationStreetName,
          cityId: destinationCityId,
        });
        streetIds.destinationStreetId = newDestStreet.id;
      // } else {
      //   streetIds.destinationStreetId = existingDestStreet.id;
      // }
    // }

    return streetIds;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Cannot create streets');
  }
};


export const createStartStreet = async (
  startStreetName: string,
  startCityId: number,
): Promise<number> => {
  let startStreetId = -1;

  try {
    // Process start street
    const existingStartStreet = await Streets.query().findOne({
      streetName: startStreetName,
    });

    if (!existingStartStreet) {
      const newStartStreet = await Streets.query().insert({
        streetName: startStreetName,
        cityId: startCityId,
      });
      startStreetId = newStartStreet.id;
    } else {
      startStreetId = existingStartStreet.id;
    }

    return startStreetId;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Cannot create a start street');
  }
};

export default Streets;
