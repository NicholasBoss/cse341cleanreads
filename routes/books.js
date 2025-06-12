const routes = require('express').Router();
const bookController = require('../controllers/bookController');
const validate = require('../utilities/validation');
const util = require('../utilities');
const authenticateToken = require('../utilities/verifyGoogleToken');

routes.get('/', util.handleErrors(bookController.getAllBooks));
routes.get('/:id', util.handleErrors(bookController.getBookById));
/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     description: Add a new book
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: Mistborn
 *             isbn10:
 *               type: string
 *               example: 9785531554
 *             isbn13:
 *               type: string
 *               example: 9785531554210
 *             publication_date:
 *               type: string
 *               format: date
 *               example: 1999-02-28
 *             description:
 *               type: string
 *               example: A fantasy book
 *             age_range:
 *               type: string
 *               example: 12-18
 *             publisher:
 *               type: string
 *               example: 665f1a1e1a1e1a1e1a1e1a03
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/books', authenticateToken, (req, res) => {
  console.log('BODY:', req.body);
  res.status(201).json({ message: 'Book created' });
});
routes.put('/:id', authenticateToken, validate.validateBook(), util.handleErrors(bookController.updateBook));
routes.delete('/:id', authenticateToken, validate.validateBookId(), util.handleErrors(bookController.deleteBook));

module.exports = routes;