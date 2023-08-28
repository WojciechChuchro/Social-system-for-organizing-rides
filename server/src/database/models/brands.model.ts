import {Model} from 'objection'
import knex from '../config/database'
import Models from './models.model'

Model.knex(knex)

class Brands extends Model {
  id!: number
  brandName: string
  static get models() {
    return {
      required: ['id'],
      properties: {
        id: {type: 'integer'},
        brandName: {type: 'string', length: 15},
      }
    }
  }

  static get relationMappings() {
    return {
      model: {
        relation: Model.HasManyRelation,
        modelClass: Models,
        join: {
          from: 'brands.id',
          to: 'models.brandId'
        },
      },
    }
  }
  static get tableName(): string {
    return 'brands'
  }
}
export default Brands