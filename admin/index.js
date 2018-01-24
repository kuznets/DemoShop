const express = require('express');
const path = require('path');

const router = require('./config/routes');

const admin = express();

admin.set('view engine', 'pug');
admin.set('views', path.join(__dirname, 'views'));

admin.on('mount', server => {
    admin.locals = Object.assign(server.locals, admin.locals);
});

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
admin.use(router);

module.exports = admin;