/**
 * @overview routes
 * Application Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */
const express = require('express');
const router = express.Router();

const user = require('../controllers/UserController');
const product = require('../controllers/ProductController');
const basket = require('../controllers/BasketController');

//Products API
router.get('/', product.getAllProducts);
router.get('/product/:id', product.getProductById);

//Users API
router.get('/user', user.getUserInfo);

//Basket
router.get('/basket', basket.getAllBasketProducts);

module.exports = router;
