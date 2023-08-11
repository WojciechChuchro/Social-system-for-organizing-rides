import {Model} from "objection";
import knex from "../config/database";
import Cities from "./cities.model";

Model.knex(knex)

class Countries extends Model {
    id!: number;
    countryName!: string;
    static get countries() {
        return {
            required: ['id', 'countryName'],
            properties: {
                id: {type: 'integer'},
                countryName: {type: 'string'},
            }
        };
    }

    static get relationMappings() {
        return {
            cities: {
                relation: Model.HasManyRelation,
                modelClass: Cities,
                join: {
                    from: 'countries.id',
                    to: 'cities.id'
                },
            },
        };
    }
    static get tableName(): string {
        return "countries";
    }
}
export default Countries