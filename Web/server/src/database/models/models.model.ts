import { Model } from 'objection';
import knex from '../config/database';
import Cars from './cars.model';
import Brands from './brands.model';

Model.knex(knex);

class Models extends Model {
  id: number;
  brandId: number;
  modelName!: string;

  static get models() {
    return {
      required: ['id', 'brandId'],
      properties: {
        id: { type: 'integer' },
        BrandId: { type: 'integer' },
        modelName: { type: 'string', length: 30 },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brands,
        join: {
          from: 'models.brandId',
          to: 'brands.id',
        },
      },
      cars: {
        relation: Model.HasManyRelation,
        modelClass: Cars,
        join: {
          from: 'models.id',
          to: 'cars.modelId',
        },
      },
    };
  }

  static get tableName(): string {
    return 'models';
  }
}

export default Models;
