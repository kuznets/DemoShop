const jwt = require('jwt-simple');

const config = require('../../config/app');

/**
 * routes:
 * /api/token
 * /api/register
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

  /**
  * Registration new user
  * @method register
  * @return
  */
  register(req, res, next) {
    if (!req.body.email || !req.body.password || !req.body.confirm) {
      return res.status(400).send('Insert correct data!');
    }
    if (req.body.password !== req.body.confirm) {
      return res.status(400).send('Passwords must match!');
    }
    return User.findOne({ email: req.body.email })
      .then(user => {
        if (user) return res.sendStatus(400).send('This email is olready taken!');
        req.body.group = [];
        req.body.group.push('user');
        userCreate(res, req, next, User);
      })
      .catch(next);
  }
});

function userCreate(res, req, next, User) {
  User.create(req.body)
    .then(newUser => {
      let payload = { id: newUser.id };
      let token = jwt.encode(payload, config.auth.jwtSecret);
      let result = {};
      Object.assign(result, {
        'email': newUser.email,
        'group': newUser.group,
        'token': token
      });
      res.locals.user = result;
      next();
    });
}
