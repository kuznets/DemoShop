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
  const token = res.locals.token;
  //console.log('controller token: ', token);
  if (!token) return res.sendStatus(401);

  res.json({ token });
}