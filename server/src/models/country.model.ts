import {Model} from "objection";
import knex from "../database/config/database";

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
    static get tableName(): string {
        return "country";
    }
}
export default Country