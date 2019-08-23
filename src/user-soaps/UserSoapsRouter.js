const path = require('path');
const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const UserSoapsService = require('./user-soaps-service');

const UserSoapsRouter = express.Router();
const bodyParser = express.json()

const serializeUserSoaps = soaps => ({
    id: soaps.id,
    name: xss(soaps.name),
    text: xss(soaps.text)
});

UserSoapsRouter
    .route('/:userId')
    
    .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    UserSoapsService.listUsersSoaps(knexInstance, req.params.userId)
        .then(userSoaps => {
            res.json(userSoaps)
        })
    .catch(next)
    })

    .post(bodyParser, (req, res, next) => {
        const {name, text} = req.body
        const user_id = req.params.userId
        const newUserSoap = {name, text, user_id}

        for(const field of ['name', 'text']) {
            if(!newUserSoap[field]) {
                logger.error(`${field} is required`)
                return res.status(400).send({
                    error: {message : `'${field}' is required`}
                })
            }
        }

        UserSoapsService.insertUserSoap(
            req.app.get('db'),
            newUserSoap
            )
            .then(soap => {
              logger.info(`Soap with id ${soap.id} created.`)
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/customSoap/${soap.id}`))
                .json(serializeUserSoaps(soap))
            })
            .catch(next)
    })

UserSoapsRouter
    .route('/:userId/customSoap/:userSoapsId')
    

    .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    UserSoapsService.getSoapById(knexInstance, req.params.userSoapsId, req.params.userId)
        .then(soap => {
            if(!soap) {
                return res.status(404).json({
                    error: {message: `Soap does not exist`}
                })
            }
            res.json(soap)
        })
        .catch(next)
    })

    .delete((req, res, next) => {
        const { userSoapsId } = req.params;
        UserSoapsService.deleteSoap(
          req.app.get('db'),
          userSoapsId
        )
        .then(soap => {
            logger.info(`Soap with id ${userSoapsId} deleted.`)
            res.status(204).end();
          })
          .catch(err => {
            next(err);
          });
      });
          
    


module.exports = UserSoapsRouter;