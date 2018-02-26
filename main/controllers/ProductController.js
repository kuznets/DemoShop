/**
 * routes:
 *  /products
 *  /product/:slug
 */

exports.showProductsPage = showProductsPage;
exports.showOneProductPage = showOneProductPage;
exports.showCreatePage = showCreatePage;
exports.showUpdatePage = showUpdatePage;

/**
 * GET /products
 * Show products page with all products.
 * @method showProductsPage
 * @return
 */
 function showProductsPage(req, res) {
   res.render('product/products', {
     title: 'Products',
   });
 }

 /**
  * GET /product/:slug
  * Show product page with one product.
  * @method showOneProductPage
  * @return
  */
  function showOneProductPage(req, res) {
    res.render('product/product', {
      title: 'Product description', 
    });
  }

  /**
  * GET /product/create
  * Show page where we can create new product.
  * @method showCreatePage
  * @return
  */
  function showCreatePage(req,res) {
  }

  /**
  * GET /product/:slug/update
  * Show page where we can edit product.
  * @method showUpdatePage
  * @return
  */
  function showUpdatePage(req,res) {
  }
