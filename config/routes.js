/**
 * @overview routes
 * Application Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */
const express = require('express');
const router = express.Router();
const admin = require('../admin');

//Routes
const main = require('../controllers/MainController');
const auth = require('../controllers/AuthController');
const user = require('../controllers/UserController');
const product = require('../controllers/ProductController');
const basket = require('../controllers/BasketController');

//Middlewares
const categories = require('../middleware/get-categories');
const products = require('../middleware/get-products');
const error = require('../middleware/error-handler');

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

//Admin
router.use('/admin', admin);

//Error handler
router.use(error.notFound);
router.use(router.get('env') === 'development' ? error.development : error.production);

module.exports = router;
