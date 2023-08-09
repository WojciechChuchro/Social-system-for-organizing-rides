import {Model} from "objection";
import knex from "../database/config/database";
import Country from "./country.model";
import StreetModel from "./street.model";

Model.knex(knex)

class City extends Model {
    id: number;
    countryId: number;
    cityName: string;
    static get reviews() {
        return {
            required: ['cityName'],
            properties: {
                id: {type: 'integer'},
                cityName: {type: 'string'},
                countryId: {type: 'integer'}
            }
        };
    }
    static get relationMappings() {
        return {
            country: {
                relation: Model.BelongsToOneRelation,
                modelClass: Country,
                join: {
                    from: 'country.CountryId',
                    to: 'city.id',
                },
            },
            street: {
                relation: Model.HasManyRelation,
                modelClass: StreetModel,
                join: {
                    from: 'country.CountryId',
                    to: 'city.id',
                },
            },
        };
    }

    static get tableName(): string {
        return "city";
    }
}
export default City