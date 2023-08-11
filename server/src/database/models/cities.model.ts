import {Model} from "objection";
import knex from "../config/database";
import Street from "./streets.model";
import Countries from "./countries.model";

Model.knex(knex)

class Cities extends Model {
    id!: number;
    countryId!: number;
    cityName!: string;
    static get cities() {
        return {
            required: ['id', 'countryId', 'cityName'],
            properties: {
                id: {type: 'integer'},
                countryId: {type: 'integer'},
                cityName: {type: 'string'},
            }
        };
    }
    static get relationMappings() {
        return {
            country: {
                relation: Model.BelongsToOneRelation,
                modelClass: Countries,
                join: {
                    from: 'countries.CountryId',
                    to: 'cities.id',
                },
            },
            street: {
                relation: Model.HasManyRelation,
                modelClass: Street,
                join: {
                    from: 'countries.CountryId',
                    to: 'cities.id',
                },
            },
        };
    }

    static get tableName(): string {
        return "cities";
    }
}
export default Cities