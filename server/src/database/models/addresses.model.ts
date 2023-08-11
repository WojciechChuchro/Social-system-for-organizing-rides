import {Model} from "objection";
import knex from "../config/database";
import StreetModel from "./streets.model";

Model.knex(knex)

class Addresses extends Model {
    id!: number;
    streetId!: number;
    zipCode!: string;
    houseNumber: string;
    gpsX: number;
    gpsY: number;

    static get addresses() {
        return {
            required: ['id', 'streetId', 'zipCode'],
            properties: {
                id: {type: 'integer'},
                streetId: {type: 'integer'},
                houseNumber: {type: 'string'},
                zipCode: {type: 'string'},
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
                    from: 'addresses.StreetId',
                    to: 'streets.id',
                },
            },
        };
    }

    static get tableName(): string {
        return "addresses";
    }
}

export default Addresses