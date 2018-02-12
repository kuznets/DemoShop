/**
 * routes:
 *  /register
 *  /login
 *  /logout
 */

 exports.showRegisterPage = showRegisterPage;
 exports.showLoginPage = showLoginPage;

 /**
  * GET /register
  * Show register page
  * @method showRegisterPage
  * @return
  */
function showRegisterPage(req, res) {
  res.render('auth/registration', {
    title: 'Register'
  });
}

/**
 * GET /login
 * Show login page
 * @method showLoginPage
 * @return
 */
 function showLoginPage(req, res) {
   res.render('auth/login', {
     title: 'Login'
   });
 }