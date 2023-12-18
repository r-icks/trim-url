import knex from 'knex';
import { connection } from './connection.js';

const db = knex({
  client: 'pg',
  connection
});

export default db;
