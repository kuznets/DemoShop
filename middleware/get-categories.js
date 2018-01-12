const categories = require('../data/categories');

module.exports = {
  getCategories(req, res, next) {
    res.locals.categories = categories;

    next();
  }
};