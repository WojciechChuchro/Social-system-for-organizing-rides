import {Model} from 'objection'
import knex from '../config/database'
import Users from './users.model'

Model.knex(knex)

class Notifications
  extends Model {
  id!: number
  userId!: number
  message!: string
  wasRead!: boolean


  static get reviews() {
    return {
      required: ['id', 'userId', 'message', 'wasRead'],
      properties: {
        id: {type: 'integer'},
        userId: {type: 'integer'},
        message: {type: 'string'},
        wasRead: {type: 'boolean'},
      }
    }
  }

  static get tableName(): string {
    return 'notifications'
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'notifications.userId',
          to: 'users.id',
        },
      },
    }
  }
}

export default Notifications


