import { JwtPayload } from 'jsonwebtoken';
import { Knex } from 'knex';

export interface DecodedToken extends JwtPayload {
  userId: string;
}

interface KnexConfig {
  [key: string]: Knex.Config;
}
