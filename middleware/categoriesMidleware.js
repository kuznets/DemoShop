const Category = require('../models/category');

module.exports = {

  /**
  * Find all categories and put it to locals.
  * @method findAllCategories
  * @return
  */
  findAllCategories(req, res, next) {
    Category.find()
      .then(categories => {
        res.locals.categories = categories;

        next();
      })
      .catch(next);
  },

  /**
  * Find one category and put it to locals.
  * @method findOneCategory
  * @return
  */
  findOneCategory(req, res, next) {
    Category.findOne({ slug: req.params.slug })
      .then(category => {
        res.locals.category = category;

        next();
      })
      .catch(next);
  },

  /**
  * POST /category/create
  * Create new category
  * @method createCategory
  * @return
  */
  createCategory(req, res, next) {
    Category.create({
      title: req.body.title,
      slug: req.body.slug,
      ico_url: req.body.ico_url
    })
      .then(() => res.redirect('/admin/categories'))
      .catch(next);
  },

  /**
  * POST /category/:slug/update
  * Update the category
  * @method updateCategory
  * @return
  */
  updateCategory(req, res, next) {
    Category.findOneAndUpdate({ slug: req.params.slug}, req.body)
      .then(category => res.redirect('/admin/categories'))
      .catch(next);
  },

  /**
  * GET /category/:slug/delete
  * Delete the category
  * @method deleteCategory
  * @return
  */
  deleteCategory(req, res, next) {
    Category.deleteOne({ slug: req.params.slug})
      .then(() => res.redirect('/admin/categories'))
      .catch(next);
    }
};