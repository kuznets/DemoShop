const mongoose = require('mongoose');

const { mongodbUri } = require('../config/app');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(mongodbUri.mlab);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

module.exports = {
    connection: mongoose.connection
};