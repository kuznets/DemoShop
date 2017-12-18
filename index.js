const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
require('./config/routes').configure(app);

// START THE SERVER
// =========================================================
app.listen(port, () => {
  console.log('App is listening on port ' + port);
});

module.exports = app;
