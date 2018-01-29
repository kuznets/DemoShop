const { Category } = require('../models/category');

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
  * POST /category/create
  * Create new category
  * @method createCategory
  * @return
  */
  createCategory(req, res, next) {
    Category.create({
      _id: req.body.id,
      title: req.body.title,
      ico_url: req.body.ico_url
    })
      .this(category => res.redirect('/admin/categories'))
      .catch(next);
  },

  /**
  * POST /category/:slug/update
  * Update the category
  * @method updateCategory
  * @return
  */
  updateCategory(req, res, next) {
    Category.findOneAndUpdate({ _id: req.body.slug}, req.body)
      .then(category => res.redirect('/admin/categories'))
      .catch(next);
  },

  /**
  * POST /category/:slug/delete
  * Delete the category
  * @method deleteCategory
  * @return
  */
  deleteCategory(req, res, next) {
    Category.deleteOne({ slug: req.body.slug})
      .then(() => res.redirect('/admin/categories'))
      .catch(next);
    }
};