import {Model} from 'objection'
import knex from '../config/database'
import Street from './streets.model'
import Countries from './cars.model'
import {CityIds} from '../../types/model'

Model.knex(knex)

class Cities extends Model {
  id!: number
  countryId!: number
  cityName!: string
  static get cities() {
    return {
      required: ['id', 'countryId', 'cityName'],
      properties: {
        id: {type: 'integer'},
        countryId: {type: 'integer'},
        cityName: {type: 'string', length: 50},
      }
    }
  }
  static get relationMappings() {
    return {
      street: {
        relation: Model.HasManyRelation,
        modelClass: Street,
        join: {
          from: 'countries.countryId',
          to: 'cities.id',
        },
      },
    }
  }

  static get tableName(): string {
    return 'cities'
  }
}

export const createStartAndDestinationCity = async (
  startCityName: string,
  destinationCityName: string,
): Promise<CityIds> => {
  const cityIds: CityIds = {
    startCityId: -1,
    destinationCityId: -1
  }

  try {
    const existingStartCity = await Cities.query().findOne({ cityName: startCityName })

    if (!existingStartCity) {
      const newStartCity = await Cities.query().insert({ cityName: startCityName })
      cityIds.startCityId = newStartCity.id
    } else {
      cityIds.startCityId = existingStartCity.id
    }

    const existingDestCity = await Cities.query().findOne({ cityName: destinationCityName })

    if (!existingDestCity) {
      const newDestCity = await Cities.query().insert({ cityName: destinationCityName })
      cityIds.destinationCityId = newDestCity.id
    } else {
      cityIds.destinationCityId = existingDestCity.id
    }

    return cityIds
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Cannot create a city')
  }
}
export default Cities