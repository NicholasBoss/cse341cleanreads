const routes = require('express').Router();
const bookController = require('../controllers/bookController');
const validate = require('../utilities/validation');
const util = require('../utilities');

routes.get('/', util.handleErrors(bookController.getAllBooks));
routes.get('/:id', util.handleErrors(bookController.getBookById));
routes.post('/', validate.validateBook(), util.handleErrors(bookController.addBook));
routes.put('/:id', validate.validateBook(), util.handleErrors(bookController.updateBook));
routes.delete('/:id', util.handleErrors(bookController.deleteBook));

module.exports = routes;