const express = require('express');
const logger = require('morgan');
//const { MongoClient} = require('mongodb');

const config = require('./config/app');
const router = require('./config/routes');

const app = express();

// MongoClient.connect('mongodb://localhost:27017/demoshop')
//   .then(client => {
//     console.log('Connected to mongodb');

//     let db = client.db('demoshop');
//     //console.log(db);

//     let collection = db.collection('demo');
//     //console.log(collection);

//     collection.insertOne({
//       title: 'DemoShop',
//       contemt: 'djkghjkghjkg'
//     }).then(result => {
//       console.log(result);
//     })
//     .catch(console.error);

//     client.close();
//   })
//   .catch(console.error);

app.set('view engine', 'pug');
app.set('views', config.paths.views);

app.locals.version = config.version;

// log to console
app.use(logger('dev'));

app.use(express.static(config.paths.public));
app.use('/lib', express.static(config.paths.lib));

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
app.use(router);

// START THE SERVER
// =========================================================
app.listen(config.port, () => {
  console.log('App is listening on port ' + config.port);
});
