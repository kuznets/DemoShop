const jwt = require('jwt-simple');

const config = require('../../config/app');


/**
 * routes:
 * /api/token
 */

module.exports = User => ({

  /**
  * User login with email and password
  * @method login
  * @return
  */
  login(req, res, next) {
    if (!req.body.email || !req.body.password) return res.sendStatus(401);
    return User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) return res.sendStatus(401);
        if (!user.isValidPassword(req.body.password)) return res.sendStatus(401);
        let payload = { id: user.id };
        let token = jwt.encode(payload, config.auth.jwtSecret);
        let result = {};
        Object.assign(result, { 
          'email': user.email, 
          'group': user.group, 
          'token': token
        });
        res.locals.user = result;
        next();
      })
      .catch(next);
  },

});