
exports.up = function(knex) {
    return knex.schema.table('posts', (table) => {
        table.string('file_type');
      })
};

exports.down = function(knex) {
    return knex.schema.table('posts', (table) => {
        table.dropColumn('file_type');
      })
};
