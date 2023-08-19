import {Model} from 'objection'
import knex from '../config/database'
import Users from './users.model'
import UserRides from '../models/userRides.model'

Model.knex(knex)

class Messages extends Model {
	id!: number
	userRideId!: number
	userId!: number
	text!: string
	sendTime!: string
	wasRead!: number


	static get messages() {
		return {
			required: ['id', 'userRideId', 'userId', 'text', 'sendTime', 'wasRead'],
			properties: {
				id: {type: 'integer'},
				userRideId: {type: 'integer'},
				userId: {type: 'integer'},
				text: {type: 'string'},
				wasRead: {type: 'integer'},
			}
		}
	}

	static get tableName(): string {
		return 'messages'
	}
	static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: Users,
				join: {
					from: 'messages.userId',
					to: 'users.id',
				},
			},
			userRide: {
				relation: Model.BelongsToOneRelation,
				modelClass: UserRides,
				join: {
					from: 'messages.userRideId',
					to: 'userRides.id'
				}
			}
		}
	}
}

export default Messages

