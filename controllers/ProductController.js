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
   res.send(`Products page`);
 }

 /**
  * GET /product/:id
  * Return detailed products info from db.
  * @method getProductById
  * @return String
  */
  function getProductById(req, res) {
    res.send(`Detailed product page. Product id: ${req.params.id}`);
  }
