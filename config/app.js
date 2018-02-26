const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..');

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
    views: path.join(ROOT_PATH, 'shared', 'views'),
    public: path.join(ROOT_PATH, 'shared', 'public'),
    favicon: path.join(ROOT_PATH, 'shared', 'public', 'favicon.ico'),
    lib: path.join(ROOT_PATH, 'node_modules')
  },
  oauth: {
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    }
  }
};
