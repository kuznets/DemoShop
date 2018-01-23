//const categories = require('../data/categories');
const { connect, ObjectID } = require('../services/db');
const collection = 'categories';

module.exports = {
  getCategories(req, res, next) {
    connect(collection).then(collection => {
      collection.find().toArray()
        .then(categories => {
          res.locals.categories = categories;
          next();
        })
        .catch(next);
    });
  }
};