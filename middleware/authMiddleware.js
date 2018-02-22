const User = require('../models/user');

/**
 * routes:
 * /logout
 */

module.exports = {

  /**
  * Authenticate the user if the userId was received
  * @method userAuth
  * @return
  */
  userAuth(req, res, next) {
    if (req.session.userId) {
      User.findById(req.session.userId)
        .then(user => {
          if (!user) return res.status(403).redirect('/login');
          res.locals.user = user;
          next();
        })
        .catch(next);
    } else {
      next();
    }
  },

  /**
  * Check user authentication.
  * @method authenticated
  * @return
  */
  authenticated(req, res, next) {
    if (res.locals.user) return next();

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