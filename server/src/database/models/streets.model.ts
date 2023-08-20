import {Model} from 'objection'
import knex from '../config/database'
import Countries from './countries.model'
import Addresses from './addresses.model'

Model.knex(knex)

class Streets extends Model {
  id!: number
  cityId!: number
  streetName!: string

  static get Streets() {
    return {
      required: ['id', 'cityId', 'streetName'],
      properties: {
        id: {type: 'integer'},
        cityId: {type: 'integer'},
        cityName: {type: 'string'},
      }
    }
  }

  static get relationMappings() {
    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: Countries,
        join: {
          from: 'streets.CityId',
          to: 'countries.id',
        },
      },
      address: {
        relation: Model.HasManyRelation,
        modelClass: Addresses,
        join: {
          from: 'streets.id',
          to: 'addresses.streetId'
        }
      }
    }
  }

  static get tableName(): string {
    return 'streets'
  }
}

export interface StreetIds {
    startStreetId: number;
    destinationStreetId: number;
}

export const createStartAndDestinationStreet = async (
  startStreetName: string,
  destinationStreetName: string,
  startCityId: number,
  destinationCityId: number
): Promise<StreetIds> => {
  const streetIds: StreetIds = {
    startStreetId: -1,
    destinationStreetId: -1
  }

  try {
    // Process start street
    const existingStartStreet = await Streets.query().findOne({streetName: startStreetName})

    if (!existingStartStreet) {
      const newStartStreet = await Streets.query().insert({streetName: startStreetName, cityId: startCityId})
      streetIds.startStreetId = newStartStreet.id
    } else {
      streetIds.startStreetId = existingStartStreet.id
    }

    // Process destination street
    const existingDestStreet = await Streets.query().findOne({streetName: destinationStreetName})

    if (!existingDestStreet) {
      const newDestStreet = await Streets.query().insert({
        streetName: destinationStreetName,
        cityId: destinationCityId
      })
      streetIds.destinationStreetId = newDestStreet.id
    } else {
      streetIds.destinationStreetId = existingDestStreet.id
    }

    return streetIds
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Cannot create a street')
  }
}
export default Streets