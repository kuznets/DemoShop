/**
 * routes:
 * /categories
 */

module.exports = Category => ({

    /**
   * GET /api/categories
   * Show categories.
   * @method findAllCategories
   * @return JSON
   */
  findAllCategories(req, res, next) {
    return Category.find()
      .then(categories => res.status(201).json(categories))
      .catch(next);
  },
})