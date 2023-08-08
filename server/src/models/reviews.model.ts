import {Model} from "objection";
import knex from "../database/config/database";
import Users from "./users.model";

Model.knex(knex)

class Reviews extends Model {
    id!: number;
    comment!: string;
    rating!: string;
    user_id!: number;

    static get reviews() {
        return {
            required: ['rating'],
            properties: {
                id: {type: 'integer'},
                comment: {type: 'string'},
                rating: {type: 'integer'},
                user_id: { type: 'integer' },
            }
        };
    }

    static get tableName(): string {
        return "reviews";
    }
    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'reviews.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}

export default Reviews

