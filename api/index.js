const express = require('express');
const passport = require('passport');
const RateLimit = require('express-rate-limit');
const cors = require('cors');

const router = require('./config/routes');

const api = express();

const limit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

api.use(cors());
api.use(limit);

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
api.use(router);

api.use((error, req, res, next) => {
  res.status(500).json(error);
});

module.exports = api;