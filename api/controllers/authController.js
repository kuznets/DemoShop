/**
 * routes:
 * /api/token
 * /api/register
 */

exports.login = login;
exports.register = register;
exports.isUser = isUser;
exports.isAdmin = isAdmin;

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

/**
 * 
 * Checks the group, if the USER then allows next actions
 * @method isUser
 * @return 
 */
function isUser(req, res, next) {
  if (req.user.group.indexOf('user') !== -1 ) return next();
  return res.status(401).send(`You don don't have permission for this action`);
}

/**
 * 
 * Checks the group, if the USER then allows next actions
 * @method isAdmin
 * @return 
 */
function isAdmin(req, res, next) {
  if (req.user.group.indexOf('admin') !== -1 ) return next();
  return res.status(401).send(`You don don't have permission for this action`);
}