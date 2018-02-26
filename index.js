const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const db = require('./shared/services/db');
const passport = require('./shared/services/passport/passport');
const config = require('./config/app');

//Modules
const admin = require('./admin');
const main = require('./main');

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
app.use(favicon(config.paths.favicon));
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

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if(req.user) {
    res.locals.user = req.user;
  }
  next();
});

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
app.use('/', main);
app.use('/admin', admin);

// START THE SERVER
// =========================================================
app.listen(config.port, () => {
  console.log('App is listening on port ' + config.port);
});
