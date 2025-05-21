const routes = require('express').Router();
const baseController = require('../controllers/baseController');
const bookRoute = require('./books')
const swagger = require('./swagger');

routes.get('/', baseController.welcomeRoute);
routes.use('/books', bookRoute);
routes.use('/', swagger);

module.exports = routes;