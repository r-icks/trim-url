export const up = async (knex) => {
    await knex.schema.createTable('collections', (table) => {
        table.increments('collectionId').primary();
        table.string('collectionName').unique().notNullable();
        table.integer('userId').unsigned().references('users.userId').onDelete('CASCADE');
    });
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('collections');
};