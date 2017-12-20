/**
 * The Basket API
 *
 * routes:
 *  /basket
 */

exports.getAllBasketProducts = getAllBasketProducts;

/**
 * GET /basket
 * Return basket info
 * @method getAllBasketProducts
 * @return String
 */
 function getAllBasketProducts(req, res) {
   res.send(`Basket page`);
 }
