import { Model } from 'objection';
import knex from '../config/database';
import Models from './models.model';
import Users from './users.model';

Model.knex(knex);

class Cars extends Model {
  id!: number;
  modelId!: number;
  registrationNumber!: string;
  color!: string;

  static get cars() {
    return {
      required: ['id', 'color', 'modelId', 'registrationNumber'],
      properties: {
        id: { type: 'integer' },
        modelId: { type: 'integer' },
        registrationNumber: { type: 'string', length: 9 },
        color: { type: 'string', length: 25 },
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: Users,
        join: {
          from: 'cars.id',
          to: 'users.carId',
        },
      },
      models: {
        relation: Model.BelongsToOneRelation,
        modelClass: Models,
        join: {
          from: 'cars.modelId',
          to: 'models.id',
        },
      },
    };
  }

  static get tableName(): string {
    return 'cars';
  }
}

// export const createStartAndDestinationCountry = async (
//   startCountryName: string,
//   destinationCountryName: string
// ): Promise<CountryIds> => {
//   const countryIds: CountryIds = {
//     startCountryId: -1,
//     destinationCountryId: -1
//   }
//
//   try {
//     // Process start country
//     const existingStartCountry = await Cars.query().findOne({countryName: startCountryName})
//
//     if (!existingStartCountry) {
//       const newStartCountry = await Cars.query().insert({countryName: startCountryName})
//       countryIds.startCountryId = newStartCountry.id
//     } else {
//       countryIds.startCountryId = existingStartCountry.id
//     }
//
//     // Process destination country
//     const existingDestCountry = await Cars.query().findOne({countryName: destinationCountryName})
//
//     if (!existingDestCountry) {
//       const newDestCountry = await Cars.query().insert({countryName: destinationCountryName})
//       countryIds.destinationCountryId = newDestCountry.id
//     } else {
//       countryIds.destinationCountryId = existingDestCountry.id
//     }
//
//     return countryIds
//   } catch (error) {
//     console.error('Error:', error)
//     throw new Error('Cannot create a country')
//   }
// }
export default Cars;
