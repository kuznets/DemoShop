const products = require('../data/books');

module.exports = {
  getProducts(req, res, next) {
    res.locals.products = products;

    next();
  },

  findOneProduct(req, res, next) {
    let productSlug = req.params.slug;
    let foundProduct = products.find(product => product.slug === productSlug);

    if (!foundProduct) {
      let error = new Error('Product not found');
      error.status = 404;
      next(error);
    } else {
      res.locals.product = foundProduct;
      console.log(res.locals.product);

      next();
    }
  }
};
