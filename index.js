const express = require('express');
const logger = require('morgan');

const db = require('./services/db');
const config = require('./config/app');
const router = require('./config/routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', config.paths.views);

app.locals.version = config.version;

// log to console
app.use(logger('dev'));

app.use(express.static(config.paths.public));
app.use('/lib', express.static(config.paths.lib));

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
app.use(router);

// START THE SERVER
// =========================================================
app.listen(config.port, () => {
  console.log('App is listening on port ' + config.port);
});
