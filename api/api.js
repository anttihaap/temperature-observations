var express = require('express');
var api = express.Router();
var authenticate = require('./middleware/authenticate');

/** 
 * Controllers
*/
var cityController = require('./controllers/citycontroller');
var tempObsController = require('./controllers/tempobscontroller');
var loginController = require('./controllers/logincontroller');

/**
 * Temperature observations
 */
api.get('/temperatures', tempObsController.temperatures);
api.post('/tempobs/add', tempObsController.add);
api.get('/cityobservations', tempObsController.cityobservations);

/**
 * City
 */
api.get('/city/activated', cityController.activatedCities);
api.get('/city/deactivated', cityController.deactivatedCities);
api.post('/city/add', authenticate, cityController.add);
api.post('/city/activate', authenticate, cityController.activate);
api.post('/city/deactivate', authenticate, cityController.deactivate);

/**
 * Authentication
 */
api.post('/login', loginController.login);


module.exports = api;