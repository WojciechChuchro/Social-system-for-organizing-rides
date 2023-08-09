import {Model} from "objection";
import knex from "../database/config/database";
import StreetModel from "./street.model";

Model.knex(knex)

export default class Address extends Model {
    id: number;
    streetId: number;
    zipCode: string;
    houseNumber: string;
    gpsX: number;
    gpsY: number;
    static get reviews() {
        return {
            required: ['cityName'],
            properties: {
                id: {type: 'integer'},
                streetId: {type: 'integer'},
                zipCode: {type: 'string'},
                houseNumber: {type: 'string'},
                gpsX: {type: 'number'},
                gpsY: {type: 'number'},
            }
        };
    }
    static get relationMappings() {
        return {
            street: {
                relation: Model.BelongsToOneRelation,
                modelClass: StreetModel,
                join: {
                    from: 'street.StreetId',
                    to: 'address.id',
                },
            },
        };
    }

    static get tableName(): string {
        return "city";
    }
}