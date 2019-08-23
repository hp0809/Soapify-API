'use strict';

const UserSoapsService = {
    listUsersSoaps(knex, userId) {
        return knex
            .select('*')
            .from('user_soaps')
            .where('user_id', userId)
    },
    getSoapById(knex, id, userId){
        return knex
            .from('user_soaps')
            .select('*')
            .where('id', id)
            .where('user_id', userId)
            .first()
    },
    insertUserSoap(knex, soap) {
        return knex
            .insert(soap)
            .into('user_soaps')
            .returning('*')
            .then(rows => rows[0]);
    },
    deleteSoap(knex, id) {
        return knex('user_soaps')
            .where({id})
            .delete()
    }
};

module.exports = UserSoapsService;