/**
 * routes:
 * /categories
 * /category/:slug/edit
 */

exports.showCategoriesPage = showCategoriesPage;
exports.showEditPage = showEditPage;

/**
 * GET /categories
 * Show categories page.
 * @method showCategoriesPage
 * @return
 */
function showCategoriesPage(req, res) {
  res.render('category/categories', {
    title: 'Categories',
  });
}

/**
 * GET /category/:slug/edit
 * Show page where we can edit the category.
 * @method showEditPage
 * @return
 */
function showEditPage(req, res) {
  res.render('category/edit-category', {
    title: 'Category edit',
  });
}