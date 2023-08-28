import {Model} from 'objection'
import knex from '../config/database'
import Users from './users.model'
import Models from './models.model'
import Addresses from './addresses.model'
import UserRides from './userRides.model'

Model.knex(knex)

class Rides extends Model {
  id!: number
  driverId!: number
  modelId!: number
  startAddressId!: number
  destinationAddressId!: number
  earliestDepartureTime!: string
  latestDepartureTime!: string
  pricePerPerson!: number
  seatsNumber!: number
  registrationNumber!: string

  static get rides() {
    return {
      required: ['id', 'driverId', 'earliestDepartureTime', 'latestDepartureTime', 'modelId', 'startAddressId', 'seatsNumber', 'pricePerPerson', 'registrationNumber'],
      properties: {
        id: {type: 'integer'},
        driverId: {type: 'integer'},
        modelId: {type: 'integer'},
        startAddressId: {type: 'integer'},
        destinationAddressId: {type: 'integer'},
        earliestDepartureTime: {type: 'date-string'},
        latestDepartureTime: {type: 'date-string'},
        registrationNumber: {type: 'string'},
        seatsNumber: {type: 'integer'},
        pricePerPerson: {type: 'float'},
      }
    }
  }

  static get tableName(): string {
    return 'rides'
  }

  static get relationMappings() {
    return {
      driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'rides.driverId',
          to: 'users.id',
        },
      },
      model: {
        relation: Model.BelongsToOneRelation,
        modelClass: Models,
        join: {
          from: 'rides.modelId',
          to: 'models.id',
        },
      },
      startAddress: {
        relation: Model.HasManyRelation,
        modelClass: Addresses,
        join: {
          from: 'rides.startAddressId',
          to: 'addresses.id',
        },
      },
      userRides: {
        relation: Model.HasManyRelation,
        modelClass: UserRides,
        join: {
          from: 'rides.id',
          to: 'userRides.rideId',
        },
      },
      
      destinationAddress: {
        relation: Model.HasManyRelation,
        modelClass: Addresses,
        join: {
          from: 'rides.destinationAddressId',
          to: 'addresses.id',
        },
      },
    }
  }
}

export async function getRidesByUserId(userId: number): Promise<Rides[]> {
  try {
    return await Rides.query()
      .where('driverId', userId)
      .withGraphFetched('[driver, model, startAddress, destinationAddress, userRides.[user, status]]')
      .orderBy('earliestDepartureTime')
  } catch (error) {
    console.error('Error fetching rides:', error)
    throw error
  }
}


export const getRidesWithEveryChildrenTable = async () => {
  return (await Rides.query()
    .select('users.name as driverName',
      'users.email as driverEmail',
      'models.modelName as driverModelName',
      'brands.brandName as driverBrandName',
      'startAddresses.zipCode as startZipCode',
      'startAddresses.houseNumber as startHouseNumber',
      'startStreets.streetName as startStreetName',
      'startCities.cityName as startCityName',
      'startCountries.countryName as startCountryName',
      'destinationAddresses.zipCode as destinationZipCode',
      'destinationAddresses.houseNumber as destinationHouseNumber',
      'destinationStreets.streetName as destinationStreetName',
      'destinationCities.cityName as destinationCityName',
      'destinationCountries.countryName as destinationCountryName',
      'rides.id',
      'rides.earliestDepartureTime',
      'rides.latestDepartureTime',
      'rides.pricePerPerson',
      'rides.seatsNumber',
      'rides.registrationNumber')
    .join('users', 'rides.driverId', 'users.id')
    .join('models', 'users.modelId', 'models.id')
    .join('brands', 'models.brandId', 'brands.id')
    .join('addresses as startAddresses', 'rides.startAddressId', 'startAddresses.id')
    .join('streets as startStreets', 'startAddresses.streetId', 'startStreets.id')
    .join('cities as startCities', 'startStreets.cityId', 'startCities.id')
    .join('countries as startCountries', 'startCities.countryId', 'startCountries.id')
    .join('addresses as destinationAddresses', 'rides.destinationAddressId', 'destinationAddresses.id')
    .join('streets as destinationStreets', 'destinationAddresses.streetId', 'destinationStreets.id')
    .join('cities as destinationCities', 'destinationStreets.cityId', 'destinationCities.id')
    .join('countries as destinationCountries', 'destinationCities.countryId', 'destinationCountries.id')
    .whereNotNull('rides.driverId')
    .whereNotNull('rides.startAddressId')
    .whereNotNull('rides.destinationAddressId')
    .whereNotNull('users.modelId')
    .whereNotNull('models.brandId')
    .whereNotNull('startAddresses.streetId')
    .whereNotNull('destinationAddresses.streetId')
    .whereNotNull('startCities.id')
    .whereNotNull('destinationCities.id')
    .whereNotNull('startCountries.id')
    .whereNotNull('destinationCountries.id'))
}

export default Rides

