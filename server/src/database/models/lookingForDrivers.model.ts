import {Model} from 'objection'
import knex from '../config/database'
import userRides from './userRides.model'

Model.knex(knex)

class LookingForDrivers extends Model {
  id!: number
  startAddressId!: number
  destinationAddressId!: number
  earliestDepartureTime!: string
  latestDepartureTime: string
  maxPrice!: number
  numberOfPeople!: number


  static get lookingForDrivers() {
    return {
      required: ['id', 'startAddressId', 'destinationAddressId', 'earliestDepartureTime', 'maxPrice', 'numberOfPeople'],
      properties: {
        id: {type: 'integer'},
        startAddressId: {type: 'integer'},
        destinationAddressId: {type: 'integer'},
        earliestDepartureTime: {type: 'string'},
        latestDepartureTime: {type: 'string'},
        maxPrice: {type: 'float'},
        numberOfPeople: {type: 'integer'},
      }
    }
  }

  static get tableName(): string {
    return 'lookingForDrivers'
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
    }
  }
}

export default LookingForDrivers

