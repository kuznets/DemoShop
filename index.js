const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const db = require('./shared/services/db');
const passport = require('./shared/services/passport/passport');
const error = require('./shared/middleware/error-handler');
const config = require('./config/app');
const dotenv = require("dotenv");

//Modules
const admin = require('./admin');
const main = require('./main');
const api = require('./api');

//Set the environment
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

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
app.use(express.json());
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
app.use('/api', api);


//Error handler
app.use(error.notFound);
app.use(app.get('env') === 'development' ? error.development : error.production);

// START THE SERVER
// =========================================================
app.listen(config.port, () => {
  console.log('App is listening on port ' + config.port);
});