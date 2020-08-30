import { Config } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const configuration: Config = {
  client: 'pg',
  connection: process.env.DB_URI,
  migrations: {
    tableName: '_knex_migrations',
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

export const development: Config = { ...configuration };
export const production: Config = { ...configuration };
