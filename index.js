const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = require('./services/db');
const config = require('./config/app');
const router = require('./config/routes');
const admin = require('./admin');

const app = express();

app.set('view engine', 'pug');
app.set('views', config.paths.views);

app.locals.version = config.version;
app.locals.basedir = config.paths.views;

// log to console
app.use(logger('dev'));

app.use(express.static(config.paths.public));
app.use('/lib', express.static(config.paths.lib));
app.use(express.urlencoded({ extended: false}));
app.use(session({
  name: 'sessionId',
  secret: config.auth.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    signed:true,
    maxAge: 1000 * 3600 * 24 * 3 // 3 days
  },
  store: new MongoStore({
    mongooseConnection: db.connection,
    ttl: 3600*24*3, // 3 days
    touchAfter: 3600*24 // 1 day
  })
}));

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
app.use('/admin', admin);
app.use(router);

// START THE SERVER
// =========================================================
app.listen(config.port, () => {
  console.log('App is listening on port ' + config.port);
});
