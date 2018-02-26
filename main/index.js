const express = require('express');
const path = require('path');

const router = require('./config/routes');

const main = express();

main.set('view engine', 'pug');
main.set('views', path.join(__dirname, 'views'));

main.on('mount', server => {
  main.locals = Object.assign(server.locals, main.locals);
});

// ---------------------------------------------------------
// Routers
// ---------------------------------------------------------
main.use(router);

module.exports = main;