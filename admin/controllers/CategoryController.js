/**
 * routes:
 *  /categories
 */

exports.showCategoriesPage = showCategoriesPage;

/**
 * GET /categories
 * Show categories page.
 * @method showCategoriesPage
 * @return
 */
function showCategoriesPage(req, res) {
  res.render('./category/categories', {
    title: 'Categories',
  });
}