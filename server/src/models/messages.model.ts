import {Model} from "objection";
import knex from "../database/config/database";
import Users from "./users.model";

Model.knex(knex)

class Messages extends Model {
    id!: number;
    userRideId!: number;
    userId!: number;
    text!: string;
    sendTime: string;
    wasRead: number;
    profilePicture: string;


    static get reviews() {
        return {
            required: ['text'],
            properties: {
                id: {type: 'integer'},
                userRideId: {type: 'integer'},
                userId: {type: 'integer'},
                text: {type: 'string'},
                wasRead: {type: 'integer'},
                profilePicture: { type: 'string' },
            }
        };
    }

    static get tableName(): string {
        return "messages";
    }
    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'messages.userId',
                    to: 'users.id',
                },
            },
        };
    }
}

export default Messages

