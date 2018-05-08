/**
 * routes:
 * /api/token
 */

exports.login = login;

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