/**
 * routes:
 *  /products
 *  /product/:slug
 */

exports.showProductsPage = showProductsPage;
exports.showOneProductPage = showOneProductPage;

/**
 * GET /products
 * Show products page with all products.
 * @method showProductsPage
 * @return
 */
 function showProductsPage(req, res) {
   res.render('./product/products', {
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
    res.render('./product/product', {
      title: 'Product description', 
    });
  }
