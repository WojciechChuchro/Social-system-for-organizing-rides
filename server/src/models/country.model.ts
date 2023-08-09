import {Model} from "objection";
import knex from "../database/config/database";
import City from "./city.model";

Model.knex(knex)

class Country extends Model {
    id: number;
    countryName: string;
    static get reviews() {
        return {
            required: ['countryName'],
            properties: {
                id: {type: 'integer'},
                countryName: {type: 'string'},
            }
        };
    }

    static get relationMappings() {
        return {
            city: {
                relation: Model.HasManyRelation,
                modelClass: City,
                join: {
                    from: 'country.id',
                    to: 'city.userId'
                },
                cascadeDelete: true,
            },
        };
    }
    static get tableName(): string {
        return "country";
    }
}
export default Country