import { Model } from "objection";
import knex from "../database/config/database";
Model.knex(knex)

class Users extends Model {
  id!: number;
  email!: string;
  password!: string;
  sessionToken!: string;
  salt!: string;

  static get UserSchema() {
    return {
      required: ['email, password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        password: { type: 'string' },
        salt: { type: 'string' },
        sessionToken: { type: 'string' }
      }
    };
  };
  static get tableName(): string {
    return "users";
  }

  static async getHashPassword(email: string): Promise<string | null> {
    try {
      // Retrieve the user from the database based on the given email
      const user = await Users.query().where('email', email).select('password', 'salt').first();

      if (user) {
        // Assuming the 'password' field stores the hashed password in the database
         return user.password;
      }

      return null; // If no user with the given email is found, return null
    } catch (error) {
      // Handle any errors that may occur during the database query
      console.error('Error fetching hashed password by email:', error);
      return null;
    }
  }


  static async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await Users.query().where("email", email).first();
      return user || null;
    } catch (error) {
      // Handle any errors that may occur during the database query
      console.error("Error fetching user by email:", error);
      return null;
    }
  }


}
export default Users

