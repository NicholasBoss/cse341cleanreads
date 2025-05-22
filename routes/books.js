const routes = require('express').Router();
const bookController = require('../controllers/bookController');

routes.get('/', bookController.getAllBooks);
routes.get('/:id', bookController.getBookById);
routes.post('/', bookController.addBook);
routes.put('/:id', bookController.updateBook);
routes.delete('/:id', bookController.deleteBook);

module.exports = routes;