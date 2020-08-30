import knex from 'knex';

export const db = knex({
  client: 'pg',
  connection: process.env.NODE_ENV == 'production' ? process.env.DOCKER_DB_URI : process.env.DB_URI,
});
