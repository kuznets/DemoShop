/**
 * routes:
 *  /prodile
 */

exports.showUserProfile = showUserProfile;

/**
 * GET /profile
 * Return user info
 * @method showUserProfile
 * @return
 */
function showUserProfile(req, res) {
  if (!res.locals.user) {
    res.redirect('/register');
  }
  res.render('user/profile', {
    title: 'User page.'
  });
}
