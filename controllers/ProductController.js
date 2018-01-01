/**
 * The Product API
 *
 * routes:
 *  /
 *  /product/:id
 */

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;

/**
 * GET /
 * Return all products from db.
 * @method getAllProducts
 * @return String
 */
 function getAllProducts(req, res) {
   res.render('./products/index', { title: 'Hello Pug' });
 }

 /**
  * GET /product/:id
  * Return detailed products info from db.
  * @method getProductById
  * @return String
  */
  function getProductById(req, res) {
    let product = {id: '1', name: 'test'};
    res.render('./products/product', {
      title: 'Product description',
      product: product
    });
  }
