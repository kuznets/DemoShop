/**
 * routes:
 *  /user/:id
 */

exports.getUserInfo = getUserInfo;

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
