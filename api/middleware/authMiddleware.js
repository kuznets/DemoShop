const jwt = require('jwt-simple');

const User = require('../../shared/models/user');
const config = require('../../config/app');


/**
 * routes:
 * /api/token
 */

module.exports = {

  /**
  * User login with email and password
  * @method login
  * @return
  */
  login(req, res, next) {
    if (!req.body.email || !req.body.password) return res.sendStatus(401);
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) return res.sendStatus(401);
        if (!user.isValidPassword(req.body.password)) return res.sendStatus(401);
        let payload = { id: user.id };
        let token = jwt.encode(payload, config.auth.jwtSecret);

        res.locals.token = token;
        next();
      })
      .catch(next);
  },

};