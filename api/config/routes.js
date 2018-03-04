/**
 * @overview routes
 * API module Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */

const router = require('express').Router();
const passport = require('passport');
const cache =  require('apicache').middleware;

//Controllers
const productsController = require('../controllers/ProductController');
const authController = require('../controllers/authController');
//Middleware
const auth = require('../middleware/authMiddleware');

//Unauthenticated routes
//Products routes
router.get('/products',
  cache('1 minute'),
  productsController.findAllProducts
);
router.get('/product/:slug', productsController.getOneProduct)

//Login with emain and password
router.post('/token',
  auth.login,
  authController.login
);

//Authenticated routes
//Authentication with token
router.use(passport.authenticate('jwt', { session: false }));

//Products routes

router.post('/product', productsController.createProduct);
router.put('/product/:slug', productsController.updateOneProduct);
router.delete('/product/:slug', productsController.deleteOneProduct);



module.exports = router;