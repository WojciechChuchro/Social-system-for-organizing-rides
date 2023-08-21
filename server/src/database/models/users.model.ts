import {Model} from 'objection'
import knex from '../config/database'
import Reviews from './reviews.model'
import Messages from './messages.model'
import Models from './models.model'
import {authentication} from '../../helpers'

Model.knex(knex)

class Users extends Model {
  id!: number
  modelId!: number
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
      required: ['id', 'modelId', 'email', 'name', 'surname', 'phoneNumber', 'profilePicture', 'password', 'sessionToken', 'salt'],
      properties: {
        id: {type: 'integer'},
        modelId: {type: 'integer'},
        email: {type: 'string'},
        name: {type: 'string'},
        surname: {type: 'string'},
        phoneNumber: {type: 'string'},
        profilePicture: {type: 'string'},
        password: {type: 'string'},
        salt: {type: 'string'},
        sessionToken: {type: 'string'},
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
      model: {
        relation: Model.BelongsToOneRelation,
        modelClass: Models,
        join: {
          from: 'users.modelId',
          to: 'models.id',
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
      console.error('Error fetching hashed password by email:', error)
      return null
    }
  }


  static async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await Users.query().where('email', email).first()
      return user || null
    } catch (error) {
      console.error('Error fetching user by email:', error)
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
    modelId,
  }: {
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password: string;
    salt: string;
    modelId: number;
  }): Promise<void> {
    try {
      await Users.query().insert({
        name,
        surname,
        phoneNumber,
        email,
        password: authentication(salt, password),
        salt,
        modelId,
      })
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

}

export default Users

