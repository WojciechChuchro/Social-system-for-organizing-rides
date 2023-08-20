import {Model} from 'objection'
import knex from '../config/database'
import Cities from './cities.model'
import {CountryIds} from '../../types/model'

Model.knex(knex)

class Countries extends Model {
  id!: number
  countryName!: string

  static get countries() {
    return {
      required: ['id', 'countryName'],
      properties: {
        id: {type: 'integer'},
        countryName: {type: 'string'},
      }
    }
  }

  static get relationMappings() {
    return {
      cities: {
        relation: Model.HasManyRelation,
        modelClass: Cities,
        join: {
          from: 'countries.id',
          to: 'cities.id'
        },
      },
    }
  }

  static get tableName(): string {
    return 'countries'
  }
}



export const createStartAndDestinationCountry = async (
  startCountryName: string,
  destinationCountryName: string
): Promise<CountryIds> => {
  const countryIds: CountryIds = {
    startCountryId: -1,
    destinationCountryId: -1
  }

  try {
    // Process start country
    const existingStartCountry = await Countries.query().findOne({countryName: startCountryName})

    if (!existingStartCountry) {
      const newStartCountry = await Countries.query().insert({countryName: startCountryName})
      countryIds.startCountryId = newStartCountry.id
    } else {
      countryIds.startCountryId = existingStartCountry.id
    }

    // Process destination country
    const existingDestCountry = await Countries.query().findOne({countryName: destinationCountryName})

    if (!existingDestCountry) {
      const newDestCountry = await Countries.query().insert({countryName: destinationCountryName})
      countryIds.destinationCountryId = newDestCountry.id
    } else {
      countryIds.destinationCountryId = existingDestCountry.id
    }

    return countryIds
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Cannot create a country')
  }
}
export default Countries