import knexfile from '../knexfile';
import knex from 'knex';

const env = 'development';

export default knex(knexfile[env]);
