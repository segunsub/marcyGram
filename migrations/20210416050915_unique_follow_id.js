
exports.up = function(knex) {
    const initQuery = ` ALTER TABLE ONLY follows ADD UNIQUE (user_id,follow_user_id)`
    return knex.raw(initQuery)
};

exports.down = function(knex) {
    const initQuery = `ALTER TABLE follows DROP CONSTRAINT follows_user_id_follow_user_id_key`
    return knex.raw(initQuery)
};
