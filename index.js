const express = require('express');
const logger = require('morgan');
const path = require('path');

const router = require('./config/routers');

const port = process.env.PORT || 3000;

const app = express();

// log to console
app.use(logger('dev'));

app.use(express.static(path.join(__dirname + '/public')));

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
app.use(router);

// START THE SERVER
// =========================================================
app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
