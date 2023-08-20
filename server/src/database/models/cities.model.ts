import {Model} from 'objection'
import knex from '../config/database'
import Street from './streets.model'
import Countries from './countries.model'
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
        cityName: {type: 'string'},
      }
    }
  }
  static get relationMappings() {
    return {
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Countries,
        join: {
          from: 'countries.CountryId',
          to: 'cities.id',
        },
      },
      street: {
        relation: Model.HasManyRelation,
        modelClass: Street,
        join: {
          from: 'countries.CountryId',
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
  startCountryId: number,
  destinationCountryId: number
): Promise<CityIds> => {
  const cityIds: CityIds = {
    startCityId: -1,
    destinationCityId: -1
  }

  try {
    // Process start city
    const existingStartCity = await Cities.query().findOne({ cityName: startCityName })

    if (!existingStartCity) {
      const newStartCity = await Cities.query().insert({ cityName: startCityName, countryId: startCountryId })
      cityIds.startCityId = newStartCity.id
    } else {
      cityIds.startCityId = existingStartCity.id
    }

    // Process destination city
    const existingDestCity = await Cities.query().findOne({ cityName: destinationCityName })

    if (!existingDestCity) {
      const newDestCity = await Cities.query().insert({ cityName: destinationCityName, countryId: destinationCountryId })
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