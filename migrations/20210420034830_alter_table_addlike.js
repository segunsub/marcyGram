
exports.up = function(knex) {
    const initQuery = ` ALTER TABLE comments ADD COLUMN loved INT DEFAULT 0;`
    return knex.raw(initQuery)
};

exports.down = function(knex) {
    const initQuery = `ALTER TABLE comments DROP column loved`
    return knex.raw(initQuery)
};
