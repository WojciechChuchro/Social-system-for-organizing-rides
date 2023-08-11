import {Model} from "objection";
import knex from "../config/database";

Model.knex(knex)

class Models extends Model {
    id: number;
    brandId: number;
    modelName!: string;

    static get models() {
        return {
            required: ['id', 'brandId'],
            properties: {
                id: {type: 'integer'},
                BrandId: {type: 'integer'},
                modelName: {type: 'string'},
            }
        };
    }

    static get relationMappings() {
        return {
            brands: {
                relation: Model.HasOneRelation,
                modelClass: Models,
                join: {
                    from: 'models.brandId',
                    to: 'brands.id'
                },
            },
        };
    }

    static get tableName(): string {
        return "models";
    }
}

export default Models