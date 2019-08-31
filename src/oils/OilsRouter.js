const path = require('path');
const express = require('express');
const logger = require('../logger');
const OilsService = require('./oils-service');
const jsonBodyParser = express.json()

const OilsRouter = express.Router();

OilsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        OilsService.listOils(knexInstance)
            .then(oils => {
                
                res.json(oils)
                                
            })
            .catch(next)
        })


module.exports = OilsRouter;