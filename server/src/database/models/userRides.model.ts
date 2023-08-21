import {Model} from 'objection'
import knex from '../config/database'
import LookingForDrivers from './lookingForDrivers.model'
import Statuses from './statuses.model'
// Import other necessary models, especially if they are related

Model.knex(knex)

class UserRides extends Model {
  id!: number
  userId!: number
  rideId!: number
  lookingForDriverId!: number | null
  statusId!: number

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'rideId', 'statusId'], // Removed 'id' from required
      properties: {
        id: {type: 'integer'},
        userId: {type: 'integer'},
        rideId: {type: 'integer'},
        lookingForDriverId: {type: 'integer'},
        statusId: {type: 'integer'},
      }
    }
  }

  static get tableName(): string {
    return 'userRides'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserRides,  // Adjusted model name
        join: {
          from: 'userRides.userId',
          to: 'users.id',
        },
      },
      lookingForDriver: {  // Renamed for clarity
        relation: Model.BelongsToOneRelation,
        modelClass: LookingForDrivers,
        join: {
          from: 'userRides.lookingForDriverId',
          to: 'lookingForDrivers.id',
        },
      },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Statuses,  // Make sure this model is imported and correct
        join: {
          from: 'userRides.statusId',
          to: 'statuses.id',
        },
      },
    }
  }
}

export default UserRides
