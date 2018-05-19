const mongoose = require('mongoose');

const { mongodbUri } = require('../../config/app');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(mongodbUri.mlab);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', () => {
        process.exit(0);
    });
});


module.exports = {
    connection: mongoose.connection
};
