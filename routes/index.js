const routes = require('express').Router();
const baseController = require('../controllers/baseController');
const bookRoute = require('./books')
const publisherRoute = require('./publishers');
const swagger = require('./swagger');
const passport = require('passport');
const util = require('../utilities');

routes.get('/', baseController.welcomeRoute);
routes.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

routes.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login
    res.redirect('/profile');
  }
);

routes.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`Hello, ${req.user.displayName}. Check out our API documentation <a href="/api-docs">here</a>.`);
});

routes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});
routes.use('/books', util.ensureAuthenticated, bookRoute);
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     security:
 *       - OAuth2: [openid, email, profile]
 *     responses:
 *       200:
 *         description: List of books
 */

routes.use('/publishers', util.ensureAuthenticated, publisherRoute);
routes.use('/', swagger);

module.exports = routes;