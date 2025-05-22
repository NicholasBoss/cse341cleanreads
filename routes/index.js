const routes = require('express').Router();
const baseController = require('../controllers/baseController');
const bookRoute = require('./books')
const publisherRoute = require('./publishers');
const swagger = require('./swagger');

routes.get('/', baseController.welcomeRoute);
routes.use('/books', bookRoute);
routes.use('/publishers', publisherRoute);
routes.use('/', swagger);

module.exports = routes;