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
const Orders = require('../../shared/models/orders');

//Controllers
const productsController = require('../controllers/ProductController')(Product);
const cartController = require('../controllers/cartController')(Cart, Product);
const ordersController = require('../controllers/ordersController')(Orders, Product);
const authController = require('../controllers/authController');
const categoriesController = require('../controllers/categoriesController')(Category);
//Middleware
const auth = require('../middleware/authMiddleware')(User);

//Unauthenticated routes
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

// Cart routes
router.post('/cart', cartController.createCartProducts);
router.get('/cart', cartController.getCartProducts);
router.get('/cart/products', cartController.getProductsData);
router.put('/cart/:id/add', cartController.addCartProduct);
router.put('/cart/:id/update', cartController.updateProductInCart);
router.put('/cart/:id/remove', cartController.removeCartProduct);
router.delete('/cart/:id', cartController.deleteCart);

// Orders routes
router.post('/orders', ordersController.createOrder);


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
router.use(passport.authenticate('jwt', { session: false }));

// USER group routes
router.use(authController.isUser);

//ADMIN group routes
router.use(authController.isAdmin);
//Products routes
router.post('/product', productsController.createProduct);
router.put('/product/:slug', productsController.updateOneProduct);
router.delete('/product/:slug', productsController.deleteOneProduct);


// Orders routes
router.get('/orders', ordersController.getOrders);
router.get('/order/:id', ordersController.getOrder);
router.put('/order/:id', ordersController.putOrder);
router.delete('/order/:id', ordersController.deleteOrder);

module.exports = router;
