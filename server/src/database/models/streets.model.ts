import {Model} from "objection";
import knex from "../config/database";
import Countries from "./countries.model";
import Addresses from "./addresses.model";

Model.knex(knex)

class Streets extends Model {
    id!: number;
    cityId!: number;
    streetName!: string;
    static get Streets() {
        return {
            required: ['id', 'cityId', 'streetName'],
            properties: {
                id: {type: 'integer'},
                cityId: {type: 'integer'},
                cityName: {type: 'string'},
            }
        };
    }
    static get relationMappings() {
        return {
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: Countries,
                join: {
                    from: 'streets.CityId',
                    to: 'countries.id',
                },
            },
            address: {
                relation: Model.HasManyRelation,
                modelClass: Addresses,
                join: {
                    from: 'streets.id',
                    to: 'addresses.streetsiD'
                }
            }
        };
    }

    static get tableName(): string {
        return "streets";
    }
}

export default Streets