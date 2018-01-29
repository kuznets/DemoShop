const path = require('path');

module.exports = {
    version: '1.0.0',
    port: process.env.PORT || 3000,
    mongodbUri: {
        local: 'mongodb://localhost:27017/demoshop',
        mlab: process.env.MONGODB_MLAB_URL
    },
    paths: {
        views: path.resolve(__dirname, '..', 'views'),
        public: path.resolve(__dirname, '..', 'public'),
        lib: path.resolve(__dirname, '..', 'node_modules'),
        middleware: path.resolve(__dirname, '..', 'middleware')
    }
};
