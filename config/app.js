const path = require('path');

module.exports = {
  version: '1.0.0',
  port: process.env.PORT || 3000,
  mongodbUri: {
    local: 'mongodb://localhost:27017/demoshop',
    mlab: process.env.MONGODB_MLAB_URL
  },
  auth: {
    sessionSecret: process.env.SESSION_SECRET
  },
  paths: {
    views: path.resolve(__dirname, '..', 'views'),
    public: path.resolve(__dirname, '..', 'public'),
    favicon: path.resolve(__dirname, '..', 'public', 'favicon.ico'),
    lib: path.resolve(__dirname, '..', 'node_modules'),
    middleware: path.resolve(__dirname, '..', 'middleware')
  },
  oauth: {
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    }
  }
};
