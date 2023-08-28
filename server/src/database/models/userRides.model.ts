import { Model } from 'objection'
import knex from '../config/database'
import Rides from './rides.model'
import LookingForDrivers from './lookingForDrivers.model'
import Statuses from './statuses.model'
import Users from './users.model'



Model.knex(knex)

class UserRides extends Model {
  id!: number
  userId!: number
  rideId!: number
  lookingForDriverId!: number | null
  statusId!: boolean

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'rideId', 'statusId'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        rideId: { type: 'integer' },
        lookingForDriverId: { type: ['integer', 'null'] },
        statusId: { type: 'boolean' },
      },
    }
  }

  static get tableName(): string {
    return 'userRides'
  }

  static get relationMappings() {
    return {
      ride: {
        relation: Model.BelongsToOneRelation,
        modelClass: Rides,
        join: {
          from: 'userRides.rideId',
          to: 'rides.id',
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'userRides.userId',
          to: 'users.id',
        },
      },

      lookingForDriver: {
        relation: Model.BelongsToOneRelation,
        modelClass: LookingForDrivers,
        join: {
          from: 'userRides.lookingForDriverId',
          to: 'lookingForDrivers.id',
        },
      },

      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Statuses,
        join: {
          from: 'userRides.StatusId',
          to: 'statuses.id',
        },
      },
    }
  }
}

export default UserRides
