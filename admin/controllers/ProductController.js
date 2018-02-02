/**
 * routes:
 * /products
 * /product/:slug/edit
 * /product/create
 */

exports.showProductsPage = showProductsPage;
exports.showEditPage = showEditPage;
exports.showCreatePage = showCreatePage;

/**
 * GET /products
 * Show products page.
 * @method showProductsPage
 * @return
 */
function showProductsPage(req, res) {
  res.render('product/products', {
    title: 'Products',
  });
}

/**
 * GET /product/:slug/edit
 * Show page where we can edit the product.
 * @method showEditPage
 * @return
 */
function showEditPage(req, res) {
  res.render('product/edit-product', {
    title: 'Product edit',
  });
}

/**
 * GET /product/create
 * Show page where we can create the product.
 * @method showCreatePage
 * @return
 */
function showCreatePage(req, res) {
  res.render('product/create-product', {
    title: 'Product create',
  });
}