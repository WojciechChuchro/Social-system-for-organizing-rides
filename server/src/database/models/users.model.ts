import {Model} from 'objection'
import knex from '../config/database'
import Reviews from './reviews.model'
import Messages from './messages.model'
import {authentication} from '../../helpers'
import Cars from './cars.model'
import Rides from './rides.model'

Model.knex(knex)

class Users extends Model {
  id!: number
  carId?: number | null
  email!: string
  name!: string
  surname!: string
  phoneNumber!: string
  profilePicture!: string
  password!: string
  sessionToken!: string
  salt!: string


  static get UserSchema() {
    return {
      required: ['id', 'email', 'name', 'surname', 'phoneNumber', 'profilePicture', 'password', 'sessionToken', 'salt'],
      properties: {
        id: {type: 'integer'},
        carId: {type: ['integer', 'null']},
        email: {type: 'string', length: 50},
        name: {type: 'string', length: 20},
        surname: {type: 'string', length: 30},
        phoneNumber: {type: 'string', length: 12},
        profilePicture: {type: 'string', length: 255},
        password: {type: 'string', length: 255},
        salt: {type: 'string', length: 255},
        sessionToken: {type: 'string', length: 255},
      }
    }
  }

  static get relationMappings() {
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Reviews,
        join: {
          from: 'users.id',
          to: 'reviews.userId'
        },
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Messages,
        join: {
          from: 'users.id',
          to: 'messages.userId'
        }
      },
      cars: {
        relation: Model.HasManyRelation,
        modelClass: Cars,
        join: {
          from: 'users.carId',
          to: 'cars.id',
        },
      },
      rides: {
        relation: Model.HasManyRelation,
        modelClass: Rides,
        join: {
          from: 'users.id',
          to: 'rides.driverId',
        },
      },
    }
  }

  static get tableName(): string {
    return 'users'
  }


  static async getHashPassword(email: string): Promise<string | null> {
    try {
      const user = await Users.query().where('email', email).select('password', 'salt').first()

      if (user) {
        return user.password
      }

      return null
    } catch (error) {
      console.error('Error getting hashed password by email:', error)
      return null
    }
  }


  static async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await Users.query().where('email', email).first()
      return user || null
    } catch (error) {
      console.error('Error getting user by email:', error)
      return null
    }
  }

  static async updateSessionToken(user: Users, sessionToken: string): Promise<void> {
    try {
      await Users.query().findById(user.id).patch({sessionToken})
    } catch (error) {
      console.error('Error updating session token:', error)
      throw error
    }
  }

  static async createUser({
    name,
    surname,
    phoneNumber,
    email,
    password,
    salt,
  }: {
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password: string;
    salt: string;
  }): Promise<void> {
    try {
      await Users.query().insert({
        name,
        surname,
        phoneNumber,
        email,
        password: authentication(salt, password),
        salt,
        carId: null
      })
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

}

export default Users

