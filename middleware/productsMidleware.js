const { connect, ObjectID } = require('../services/db');
const collection = 'products';

module.exports = {
  getAllProducts(req, res, next) {
    connect(collection).then(collection => {
      collection.find().toArray()
        .then(products => {
          req.products = products;
          next();
        })
        .catch(next);
    });
  },

  findOneProduct(req, res, next) {
    let slug = req.params.slug;
    connect(collection).then(collection => {
      collection.findOne({ slug: slug })
        .then(product => {
          req.product = product;
          next();
        })
        .catch(next);
    });
  }
};
