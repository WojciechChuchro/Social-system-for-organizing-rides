import {Model} from "objection";
import knex from "../database/config/database";
Model.knex(knex)

class Users extends Model {
  static get tableName(): string {
    return "users";
  }


}

export default Users

