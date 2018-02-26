/**
 * @overview routes
 * Admin module Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */

const router = require('express').Router();

//Controllers
const mainPage = require('../controllers/MainController');
const categoriesPages = require('../controllers/CategoryController');
const productsPages = require('../controllers/ProductController');

//Middlewares
const categories = require('../../shared/middleware/categoriesMiddleware');
const products = require('../../shared/middleware/productsMiddleware');
const groups = require('../../shared/middleware/groupsMiddleware');

//Verify admin rights
router.use(groups.isAdminGroup);

//Categories routes
router.get('/categories',
  categories.findAllCategories,
  categoriesPages.showCategoriesPage
);
router.get('/category/:slug/edit',
  categories.findOneCategory,
  categoriesPages.showEditPage
);
router.post('/category/create', categories.createCategory);
router.post('/category/:slug/update', categories.updateCategory);
router.get('/category/:slug/delete', categories.deleteCategory);

//Products routes
router.get('/products',
  categories.findAllCategories,
  products.findAllProducts,
  productsPages.showProductsPage
);
router.get('/product/:slug/edit',
  categories.findAllCategories,
  products.findOneProduct,
  productsPages.showEditPage
);
router.get('/product/create', 
  categories.findAllCategories, 
  productsPages.showCreatePage
);
router.post('/product/create', products.createProduct);
router.post('/product/:slug/update', products.updateProduct);
router.get('/product/:slug/delete', products.deleteProduct);

//Main page
router.get('/', mainPage.showMainAdminPage);

module.exports = router;