/**
 * routes:
 *  /basket
 */

exports.showBasketPage = showBasketPage;

/**
 * GET /basket
 * Show basker page.
 * @method showBasketPage
 * @return
 */
 function showBasketPage(req, res) {
   res.render('basket/basket', {
     title: 'Basket'
   });
 }
