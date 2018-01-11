/**
 * routes:
 *  /user/:id
 */

exports.showUserInfo = showUserInfo;

/**
 * GET /user/:id
 * Return user info
 * @method showUserInfo
 * @return
 */
 function showUserInfo(req, res) {
   res.render('./user/user', {
     title: 'User page.'
   });
 }
