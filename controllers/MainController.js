/**
 * routes:
 *  /
 */

 exports.showMainPage = showMainPage;

 /**
  * GET /
  * Show main page with sales.
  * @method showMainPage
  * @return
  */
  function showMainPage(req, res) {
    res.render('./main/main', {
      title: 'Main',
    });
  }
