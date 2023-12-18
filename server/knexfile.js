import { connection } from "./db/connection.js";
export default {
    development: {
      client: 'postgresql',
      connection,
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
    // Add other environments (e.g., production) if needed
  };