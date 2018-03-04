const User = require('../models/user');

/**
 * routes:
 * /logout
 */

module.exports = {

  /**
  * Check user authentication.
  * @method authenticated
  * @return
  */
  authenticated(req, res, next) {
    if (res.locals.user) return next();
    console.log('Redirect to /login...');
    res.status(403).redirect('/login');
  },

  /**
  * Check user unauthentication.
  * @method authenticated
  * @return
  */
  unauthenticated(req, res, next) {
    if (!res.locals.user) return next();

    res.redirect('/');
  },

  /**
   * GET /logout
   * Logout
   * @method logout
   * @return
   */
  logout(req, res, next) {
    if (req.session) {
      req.session.destroy(error => {
        if (error) return next(error);
        res.redirect('/');
      });
    } else {
      let error = new Error('You better login first!');
      next(error);
    }
  }
};