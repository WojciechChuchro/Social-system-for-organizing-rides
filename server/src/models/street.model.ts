import {Model} from "objection";
import knex from "../database/config/database";
import Country from "./country.model";
import Address from "./address.model";

Model.knex(knex)

class Street extends Model {
    id: number;
    cityId: number;
    streetName: string;
    static get reviews() {
        return {
            required: ['streetName'],
            properties: {
                id: {type: 'integer'},
                cityName: {type: 'string'},
                cityId: {type: 'integer'}
            }
        };
    }
    static get relationMappings() {
        return {
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: Country,
                join: {
                    from: 'city.CityId',
                    to: 'street.id',
                },
            },
            address: {
                relation: Model.HasManyRelation,
                modelClass: Address,
            }
        };
    }

    static get tableName(): string {
        return "street";
    }
}

export default Street