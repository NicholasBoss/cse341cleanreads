const routes = require('express').Router();
const baseController = require('../controllers/baseController');
const swagger = require('./swagger');

routes.get('/', baseController.welcomeRoute);
// routes.use('/contacts', require('./contacts'));
routes.use('/', swagger);

module.exports = routes;