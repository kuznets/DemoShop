/**
 * routes:
 *  /
 */

exports.showMainAdminPage = showMainAdminPage;
/**
 * GET /
 * Show main page with sales.
 * @method showMain
 * @return
 */
function showMainAdminPage(req, res) {
    console.log('showMain');
    res.render('./main/main', {
        title: 'Main',
    });
}