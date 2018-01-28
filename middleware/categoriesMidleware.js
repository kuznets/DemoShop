const categories = require('../data/categories');

module.exports = {

  /**
  * Find all categories and put it to locals.
  * @method findAllCategories
  * @return
  */
  findAllCategories(req, res, next) {
    res.locals.categories = categories;

    next();
  },

  /**
  * POST /category/create
  * Create new category
  * @method createCategory
  * @return
  */
  createCategory(req, res, next) {

    next();
  },

  /**
  * POST /category/:slug/update
  * Update the category
  * @method updateCategory
  * @return
  */
  updateCategory(req, res, next) {

    next();
  },

  /**
  * POST /category/:slug/delete
  * Delete the category
  * @method deleteCategory
  * @return
  */
  deleteCategory(req, res, next) {

    next();
  }
};