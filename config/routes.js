/**
 * @overview routes
 * Application Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */

 exports.configure = function configure(app) {

   app.get('/', (req, res) => {
     res.send(`Hello, this is Demo Shop`);
   });

 }
