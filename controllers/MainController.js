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
    //console.log('req.user: ', req.user);
    //console.log('res.locals.user: ', res.locals.user);
    res.render('main/main', {
      title: 'Main',
    });
  }
