export const up = async (knex) => {
    await knex.schema.createTable('urls', (table) => {
      table.increments('urlId').primary();
      table.string('shortName').notNullable();
      table.text('redirectUrl').notNullable();
      table.integer('collectionId').unsigned().references('collections.collectionId').onDelete('CASCADE');

      table.unique(['shortName', 'collectionId']);
    });
  };
  
export const down = async (knex) => {
  await knex.schema.dropTableIfExists('urls');
};