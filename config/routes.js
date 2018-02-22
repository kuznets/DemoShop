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
const mainPage = require('../controllers/MainController');
const authPages = require('../controllers/AuthController');
const userPages = require('../controllers/UserController');
const productPages = require('../controllers/ProductController');
const basketPages = require('../controllers/BasketController');

//Middlewares
const categories = require('../middleware/categoriesMiddleware');
const products = require('../middleware/productsMiddleware');
const error = require('../middleware/error-handler');
const auth = require('../middleware/authMiddleware');

//Services
const passport = require('../services/passport/passport');

//Categories routes
router.use(categories.findAllCategories);

//Main routes
router.get('/', 
  products.findAllProducts, 
  mainPage.showMainPage
);

//Auth routes
router.get('/register',
  auth.unauthenticated,
  authPages.showRegisterPage
);
router.post('/register',
  auth.unauthenticated,
  passport.authenticate('local-register', {
    failureRedirect: '/register',
    successRedirect: '/'
  })
);
router.get('/login',
  auth.unauthenticated,
  authPages.showLoginPage
);
router.post('/login',
  auth.unauthenticated,
  passport.authenticate('local-login', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
);
router.get('/auth/github',
  auth.unauthenticated,
  passport.authenticate('github')
);
router.get('/auth/github/callback', 
  auth.unauthenticated,
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
  })
);
router.get('/logout',
  auth.authenticated,
  auth.logout
);

//Products routes
router.get('/products', 
  products.findAllProducts, 
  productPages.showProductsPage
);
router.get('/product/:slug', 
  products.findOneProduct, 
  productPages.showOneProductPage
);
router.get('/product/create')
  .get(productPages.showCreatePage)
  .post(products.createProduct);
router.route('/product/:slug/update')
  .get(productPages.showUpdatePage)
  .post(products.updateProduct);
router.post('/product/:slug/delete', products.deleteProduct);

//Access only for register users
router.use(auth.authenticated);

//Users routes
router.get('/profile',
  userPages.showUserProfile
);

//Basket routes
router.get('/basket', basketPages.showBasketPage);

//Error handler
router.use(error.notFound);
router.use(router.get('env') === 'development' ? error.development : error.production);

module.exports = router;
