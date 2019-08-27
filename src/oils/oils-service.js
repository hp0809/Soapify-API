'use strict';

const OilsService = {
    listOils(knex){
        return knex
            .from('soapify_oils')
            .select('*')
    }
};

module.exports = OilsService;