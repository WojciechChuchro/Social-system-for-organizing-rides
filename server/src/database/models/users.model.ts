import {Model} from "objection";
import knex from "../config/database";
import Reviews from "./reviews.model";
import Messages from "./messages.model";

Model.knex(knex)

class Users extends Model {
    id!: number;
    email!: string;
    name!: string;
    surname!: string;
    phoneNumber!: string;
    profilePicture!: string;
    password!: string;
    sessionToken!: string;
    salt!: string;


    static get UserSchema() {
        return {
            required: ['id', 'email', 'name', 'surname', 'phoneNumber', 'profilePicture', 'password', 'sessionToken', 'salt'],
            properties: {
                id: {type: 'integer'},
                email: {type: 'string'},
                name: {type: 'string'},
                surname: {type: 'string'},
                phoneNumber: {type: 'string'},
                profilePicture: {type: 'string'},
                password: {type: 'string'},
                salt: {type: 'string'},
                sessionToken: {type: 'string'},
            }
        };
    }
    static get relationMappings() {
        return {
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Reviews,
                join: {
                    from: 'users.id',
                    to: 'reviews.userId'
                },
            },
            messages: {
                relation: Model.HasManyRelation,
                modelClass: Messages,
                join: {
                    from: 'users.id',
                    to: 'messages.userId'
                }
            }
        };
    }

    static get tableName(): string {
        return "users";
    }

    static async getHashPassword(email: string): Promise<string | null> {
        try {
            const user = await Users.query().where('email', email).select('password', 'salt').first();

            if (user) {
                return user.password;
            }

            return null;
        } catch (error) {
            console.error('Error fetching hashed password by email:', error);
            return null;
        }
    }


    static async getUserByEmail(email: string): Promise<Users | null> {
        try {
            const user = await Users.query().where("email", email).first();
            return user || null;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            return null;
        }
    }


}

export default Users

