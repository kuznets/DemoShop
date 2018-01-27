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
const main = require('../controllers/MainController');

//Middlewares
const categories = require('../../middleware/get-categories');
const products = require('../../middleware/get-products');

//Required routes
router.use(categories.getCategories);

//Main page
router.get('/', main.showMainAdminPage);

module.exports = router;