import {Model} from 'objection'
import knex from '../config/database'
import LookingForDrivers from './lookingForDrivers.model'

Model.knex(knex)

class userRides extends Model {
	id!: number
	userId!: number
	rideId!: number
	lookingForDriverId!: number
	statusId!: number


	static get userRides() {
		return {
			required: ['id', 'userId', 'rideId', 'lookingForDriverId', 'statusId'],
			properties: {
				id: {type: 'integer'},
				userId: {type: 'integer'},
				rideId: {type: 'integer'},
				lookingForDriverId: {type: 'integer'},
				statusId: { type: 'integer' },
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
				modelClass: userRides,
				join: {
					from: 'userRides.userId',
					to: 'users.id',
				},
			},
			lookingForDriverId: {
				relation: Model.BelongsToOneRelation,
				modelClass: LookingForDrivers,
				join: {
					from: 'userRides.lookingForDriverId',
					to: 'lookingForDrivers.id',
				},
			},
			status: {
				relation: Model.BelongsToOneRelation,
				modelClass: LookingForDrivers,
				join: {
					from: 'userRides.statusId',
					to: 'statuses.id',
				},
			},
		}
	}
}

export default userRides

