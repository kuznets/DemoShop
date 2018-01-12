/**
 * @overview routes
 * Application Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */
const express = require('express');
const router = express.Router();

//Routes
const main = require('../controllers/MainController');
const auth = require('../controllers/AuthController');
const user = require('../controllers/UserController');
const product = require('../controllers/ProductController');
const basket = require('../controllers/BasketController');

//Middlewares
const categories = require('../middleware/get-categories');
const products = require('../middleware/get-products');

//Required routes
router.use(categories.getCategories);

//Main page
router.get('/', products.getProducts, main.showMain);

//Auth pages
router.get('/register', auth.showRegisterPage);
router.get('/login', auth.showLoginPage);
//router.post('/register', auth.register);
//router.post('/login', auth.login);
//router.post('/logout', auth.logout);

//Users page
router.get('/user/:id', user.showUserInfo);

//Products pages
router.get('/products', products.getProducts, product.showProductsPage);
router.get('/product/:slug', products.findOneProduct, product.showOneProductPage);

//Basket page
router.get('/basket', basket.showBasketPage);

module.exports = router;
