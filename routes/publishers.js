const routes = require('express').Router();
const publisherController = require('../controllers/publisherController');
const validate = require('../utilities/validation');
const util = require('../utilities');

routes.get('/', util.handleErrors(publisherController.getAllPublishers));
routes.get('/:id', util.handleErrors(publisherController.getPublisherById));
routes.post('/', validate.validatePublisher(), util.handleErrors(publisherController.addPublisher));
routes.put('/:id', validate.validatePublisher(), util.handleErrors(publisherController.updatePublisher));
routes.delete('/:id', validate.validatePublisherId(), util.handleErrors(publisherController.deletePublisher));

module.exports = routes;