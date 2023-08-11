import {Model} from "objection";
import knex from "../config/database";
import Users from "./users.model";
import Models from "./models.model";
import Addresses from "./addresses.model";

Model.knex(knex)

class rides extends Model {
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
            required: ['id', 'driverId', 'modelId', 'startAddressId', 'seatsNumber', 'pricePerPerson', 'registrationNumber'],
            properties: {
                id: {type: 'integer'},
                driverId: {type: 'integer'},
                modelId: {type: 'integer'},
                startAddressId: {type: 'string'},
                destinationAddressId: {type: 'string'},
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
            user: {
                relation: Model.HasManyRelation,
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
            startAddressId: {
                relation: Model.HasManyRelation,
                modelClass: Addresses,
                join: {
                    from: 'rides.addressId',
                    to: 'addresses.id',
                },
            },
            destinationAddressId: {
                relation: Model.HasManyRelation,
                modelClass: Addresses,
                join: {
                    from: 'rides.addressId',
                    to: 'addresses.id',
                },
            },
        };
    }
}

export default rides

