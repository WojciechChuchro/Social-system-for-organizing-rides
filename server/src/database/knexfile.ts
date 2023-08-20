import dotenv from 'dotenv'
import path from 'path'
import {KnexConfig} from '../types/config'


const envFilePath = path.join(__dirname, '../../.env')
dotenv.config({ path: envFilePath })

const knexfile: KnexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  // staging: {
  //   client: dbConfig.client,
  //   connection: {
  //     host: dbConfig.host,
  //     user: dbConfig.user,
  //     password: dbConfig.password,
  //     database: dbConfig.database,
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
  //
  // production: {
  //   client: dbConfig.client,
  //   connection: {
  //     host: dbConfig.host,
  //     user: dbConfig.user,
  //     password: dbConfig.password,
  //     database: dbConfig.database,
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
}

export default knexfile