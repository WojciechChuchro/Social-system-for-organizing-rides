import { Model } from 'objection';
import knex from '../config/database';
import Users from './users.model';

Model.knex(knex);

class Reviews extends Model {
  id!: number;
  comment?: string;
  rating!: number;
  userId!: number;

  static get reviews() {
    return {
      required: ['id', 'rating', 'userId'],
      properties: {
        id: { type: 'integer' },
        comment: { type: 'string', length: 255 },
        rating: { type: 'integer', maxValue: 5, minValue: 1 },
        userId: { type: 'integer' },
      },
    };
  }

  static get tableName(): string {
    return 'reviews';
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'reviews.userId',
          to: 'users.id',
        },
      },
    };
  }
}

export default Reviews;
