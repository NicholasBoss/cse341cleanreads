const routes = require('express').Router();
const bookController = require('../controllers/bookController');

routes.get('/', bookController.getAllBooks);
routes.post('/', bookController.addBook);

module.exports = routes;