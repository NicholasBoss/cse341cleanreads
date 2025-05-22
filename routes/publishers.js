const routes = require('express').Router();
const publisherController = require('../controllers/publisherController');

routes.get('/', publisherController.getAllPublishers);
routes.get('/:id', publisherController.getPublisherById);
routes.post('/', publisherController.addPublisher);
routes.put('/:id', publisherController.updatePublisher);
routes.delete('/:id', publisherController.deletePublisher);

module.exports = routes;