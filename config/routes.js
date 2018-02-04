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
const categories = require('../middleware/categoriesMidleware');
const products = require('../middleware/productsMidleware');
const error = require('../middleware/error-handler');

//Categories routes
//router.use(categories.findAllCategories);

//Auth routes
router.get('/register', auth.showRegisterPage);
router.get('/login', auth.showLoginPage);
//router.post('/register', auth.register);
//router.post('/login', auth.login);
//router.post('/logout', auth.logout);

//Users routes
router.get('/user/:id', user.showUserInfo);

//Products routes
router.get('/products', products.findAllProducts, product.showProductsPage);
router.get('/product/:slug', products.findOneProduct, product.showOneProductPage);
router.get('/product/create')
  .get(product.showCreatePage)
  .post(products.createProduct);
router.route('/product/:slug/update')
  .get(product.showUpdatePage)
  .post(products.updateProduct);
router.post('/product/:slug/delete', products.deleteProduct);


//Basket routes
router.get('/basket', basket.showBasketPage);

//Main routes
router.get('/', products.findAllProducts, main.showMainPage);

//Error handler
router.use(error.notFound);
router.use(router.get('env') === 'development' ? error.development : error.production);

module.exports = router;
