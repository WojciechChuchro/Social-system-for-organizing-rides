import {Model} from "objection";
import knex from "../config/database";
import City from "./cities.model";
import userRides from "./userRides.model";

Model.knex(knex)

class Statuses extends Model {
    id: number;
    isAccepted: number;
    static get reviews() {
        return {
            required: ['isAccepted'],
            properties: {
                id: {type: 'integer'},
                isAccepted: {type: 'number'},
            }
        };
    }

    static get relationMappings() {
        return {
            userRide: {
                relation: Model.HasOneRelation,
                modelClass: userRides,
                join: {
                    from: 'statuses.id',
                    to: 'userRides.statusesId'
                },
            },
        };
    }
    static get tableName(): string {
        return "statuses";
    }
}
export default Statuses