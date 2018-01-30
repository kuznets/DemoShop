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
const categoriesPage = require('../controllers/CategoryController');

//Middlewares
const categories = require('../../middleware/categoriesMidleware');
const products = require('../../middleware/productsMidleware');

//Categories routes
router.get('/categories', 
    categories.findAllCategories, 
    categoriesPage.showCategoriesPage
);

//Main page
router.get('/', mainPage.showMainAdminPage);

module.exports = router;