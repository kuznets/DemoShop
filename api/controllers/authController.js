/**
 * routes:
 * /api/token
 * /api/register
 */

exports.login = login;
exports.register = register;

/**
 * POST /api/token
 * Return the token to client.
 * @method login
 * @return JSON
 */
function login(req, res, next) {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);
  res.json({ user });
}

/**
 * POST /api/register
 * Registration new user
 * @method register
 * @return JSON
 */
function register(req, res, next) {
  const user = res.locals.user;
  if (!user) return res.status(401).send('Registration failed');
  res.json({ user });
}