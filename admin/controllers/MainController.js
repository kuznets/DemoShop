/**
 * routes:
 *  /
 */

exports.showMain = showMain;

/**
 * GET /
 * Show main page with sales.
 * @method showMain
 * @return
 */
 function showMain(req, res) {
   res.render('./main/main', {
     title: 'Main',
   });
 }