/**
 * @overview routes
 * Application Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */
const express = require('express');
const router = express.Router();

const main = require('../controllers/MainController');
const auth = require('../controllers/AuthController');
const user = require('../controllers/UserController');
const product = require('../controllers/ProductController');
const basket = require('../controllers/BasketController');

//Main page
router.get('/', main.showMain);

//Auth pages
router.get('/register', auth.showRegisterPage);
router.get('/login', auth.showLoginPage);
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);

//Users page
router.get('/user/:id', user.showUserInfo);

//Products pages
router.get('/products', product.showProductsPage);
router.get('/product/:id', product.showOneProductPage);

//Basket page
router.get('/basket', basket.showBasketPage);

module.exports = router;
