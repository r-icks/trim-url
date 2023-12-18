export const up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
      table.increments('userId').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
    });
  };
  
  export const down = async (knex) => {
    await knex.schema.dropTableIfExists('users');
  };
  