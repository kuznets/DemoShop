
module.exports = {

  /**
  * Verify the Users rights for page access.
  * @method userAuth
  * @return
  */
  isAdminGroup(req, res, next) {
    if (res.locals.user) {
      let group = res.locals.user.group;
      if ( group.indexOf('admin') != -1 ) {
        return next();
      } else {
        res.status(403).redirect('/');
      }
    }

    res.status(403).redirect('/login');
  }
};