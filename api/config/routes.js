/**
 * @overview routes
 * API module Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */

const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const cache =  require('apicache').middleware;

const Product = require('../../shared/models/product');
const Category = require('../../shared/models/category');
const Cart = require('../../shared/models/cart');
const User = require('../../shared/models/user');

//Controllers
const productsController = require('../controllers/ProductController')(Product);
const cartController = require('../controllers/cartController')(Cart, Product);
const authController = require('../controllers/authController');
const categoriesController = require('../controllers/categoriesController')(Category);
//Middleware
const auth = require('../middleware/authMiddleware')(User);

//Unauthenticated routes
//Products routes
router.get('/products',
  cache('1 minute'),
  productsController.findAllProducts
);
router.get('/product/:slug', 
  cache('5 minute'),
  productsController.getOneProduct
);

// Categories routes
router.get('/categories',
  cache('5 minute'),
  categoriesController.findAllCategories
);

//Login with emain and password
router.post('/token',
  auth.login,
  authController.login
);

// Registration new user
router.post('/register',
  auth.register,
  authController.register
);

//Authenticated routes
//Authentication with token
router.use(passport.authenticate('jwt', { session: false }));

//Products routes

router.post('/product', productsController.createProduct);
router.put('/product/:slug', productsController.updateOneProduct);
router.delete('/product/:slug', productsController.deleteOneProduct);


// Cart routes
router.post('/cart', cartController.createCartProducts);
router.get('/cart', cartController.getCartProducts);
router.put('/cart/:id/add', cartController.addCartProduct);
router.put('/cart/:id/remove', cartController.removeCartProduct);
router.delete('/cart/:id', cartController.deleteCart);


module.exports = router;