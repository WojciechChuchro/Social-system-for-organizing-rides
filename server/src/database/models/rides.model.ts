import {Model} from "objection";
import knex from "../config/database";
import Users from "./users.model";
import Models from "./models.model";
import Addresses from "./addresses.model";

Model.knex(knex)

class Rides extends Model {
    id!: number;
    driverId!: number;
    modelId!: number;
    startAddressId!: number;
    destinationAddressId!: number;
    earliestDepartureTime!: string;
    latestDepartureTime!: string;
    pricePerPerson!: number
    seatsNumber!: number;
    registrationNumber!: string;

    static get rides() {
        return {
            required: ['id', 'driverId', 'earliestDepartureTime', 'latestDepartureTime', 'modelId', 'startAddressId', 'seatsNumber', 'pricePerPerson', 'registrationNumber'],
            properties: {
                id: {type: 'integer'},
                driverId: {type: 'integer'},
                modelId: {type: 'integer'},
                startAddressId: {type: 'integer'},
                destinationAddressId: {type: 'integer'},
                earliestDepartureTime: {type: 'string'},
                latestDepartureTime: {type: 'string'},
                registrationNumber: {type: 'string'},
                seatsNumber: {type: 'integer'},
                pricePerPerson: {type: 'float'},
            }
        };
    }

    static get tableName(): string {
        return "rides";
    }

    static get relationMappings() {
        return {
            driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'rides.driverId',
                    to: 'users.id',
                },
            },
            model: {
                relation: Model.BelongsToOneRelation,
                modelClass: Models,
                join: {
                    from: 'rides.modelId',
                    to: 'models.id',
                },
            },
            startAddress: {
                relation: Model.HasManyRelation,
                modelClass: Addresses,
                join: {
                    from: 'rides.startAddressId',
                    to: 'addresses.id',
                },
            },
            destinationAddress: {
                relation: Model.HasManyRelation,
                modelClass: Addresses,
                join: {
                    from: 'rides.destinationAddressId',
                    to: 'addresses.id',
                },
            },
        };
    }
}

export default Rides

