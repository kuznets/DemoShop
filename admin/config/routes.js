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
const mainPage = require('../controllers/MainController');
const categoriesPages = require('../controllers/CategoryController');

//Middlewares
const categories = require('../../middleware/categoriesMidleware');
const products = require('../../middleware/productsMidleware');

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


//Main page
router.get('/', mainPage.showMainAdminPage);

module.exports = router;