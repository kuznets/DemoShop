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
  res.render('./auth/register', {
    title: 'Register'
  });
}

/**
 * POST /register
 * Ragister new user
 * @method register
 * @return
 */
 function register(req, res) {
   //TODO: Registrer user
 }

/**
 * GET /login
 * Show login page
 * @method showLoginPage
 * @return
 */
 function showLoginPage(req, res) {
   res.render('./auth/login', {
     title: 'Login'
   });
 }

 /**
  * POST /logout
  * Logout
  * @method logout
  * @return
  */
  function logout(req, res) {
    //TODO: logout
  }
