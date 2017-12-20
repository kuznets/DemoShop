/**
 * The User API
 *
 * routes:
 *  /user
 */

exports.getUserInfo = getUserInfo;

/**
 * GET /user
 * Return user info
 * @method getUserInfo
 * @return String
 */
 function getUserInfo(req, res) {
   res.send(`User info page`);
 }
