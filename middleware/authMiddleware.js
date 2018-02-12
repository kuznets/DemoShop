const User = require('../models/user');

/**
 * routes:
 * /register
 * /login
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
  * POST /register
  * Ragister new user
  * @method register
  * @return
  */
  register(req, res, next) {
    if (!req.body.email || !req.body.password) return next(new Error('You must enter email and password'));
    else if (req.body.password !== req.body.confirm) return next(new Error('Passwords must match'));

    User.create(req.body)
      .then(user => {
        req.session.userId = user.id;
        res.redirect('/profile');
      })
      .catch(next);
  },

  /**
   * POST /login
   * Logout
   * @method login
   * @return
   */
  login(req, res, next) {
    if (!req.body.email || !req.body.password) {
      let error = new Error('You must enter your login and password');
      error.status = 401;
      return next(error);
    }
    User.authenticate(req.body.email, req.body.password)
      .then(user => {
        req.session.userId = user.id;
        res.redirect('/');
      })
      .catch(next);
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