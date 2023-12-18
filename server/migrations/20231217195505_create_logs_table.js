export const up = async (knex) => {
    await knex.schema.createTable('logs', (table) => {
        table.increments('logId').primary();
        table.integer('urlId').unsigned().references('urls.urlId').onDelete('CASCADE');
        table.string('ipAddress').notNullable();
        table.timestamp('visitTimeStamp').defaultTo(knex.fn.now());
    });
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('logs');
}; 