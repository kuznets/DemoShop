/**
 * @overview routes
 * Admin module Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */

const express = require('express');
const router = express.Router();

//Routes
const main = require('../controllers/MainController');
//const user = require('../controllers/UserController');
//const product = require('../controllers/ProductController');

//Middlewares
//const categories = require('../../middleware/get-categories');
const products = require('../../middleware/get-products');
//const error = require('../../middleware/error-handler');

//Required routes
//router.use(categories.getCategories);

//Main page
router.get('/', products.getProducts, main.showMain);

//Users page
//router.get('/user/:id', user.showUserInfo);

//Products pages
//outer.get('/products', products.getProducts, product.showProductsPage);
//router.get('/product/:slug', products.findOneProduct, product.showOneProductPage);

//Error handler
//router.use(error.notFound);
//router.use(router.get('env') === 'development' ? error.development : error.production);

module.exports = router;