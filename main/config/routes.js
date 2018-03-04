/**
 * @overview routes
 * Main module Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */

const router = require('express').Router();

//Controllers
const mainPage = require('../controllers/MainController');
const productPages = require('../controllers/ProductController');
const userPages = require('../controllers/UserController');
const authPages = require('../controllers/AuthController');

//Middlewares
const products = require('../../shared/middleware/productsMiddleware');
const categories = require('../../shared/middleware/categoriesMiddleware');
const auth = require('../../shared/middleware/authMiddleware');

//Services
const passport = require('../../shared/services/passport/passport');

//Main page
router.get('/',
  categories.findAllCategories,
  products.findAllProducts,
  mainPage.showMainPage
);

//Products routes
router.get('/products',
  categories.findAllCategories,
  products.findAllProducts, 
  productPages.showProductsPage
);
router.get('/product/:slug',
  categories.findAllCategories,
  products.findOneProduct, 
  productPages.showOneProductPage
);

//Auth routes
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
router.get('/logout',
  auth.authenticated,
  auth.logout
);

//Users routes
router.get('/profile',
  auth.authenticated,
  userPages.showUserProfile
);

module.exports = router;