const products = require('../data/books');

module.exports = {

  /**
  * GET /products
  * Find all products and put it to locals.
  * @method findAllProducts
  * @return
  */
  findAllProducts(req, res, next) {
    res.locals.products = products;

    next();
  },

  /**
  * GET /product/:slug
  * Find one product from db and put it to locals.
  * @method findOneProduct
  * @return
  */
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
  },

  /**
  * POST /product/create
  * Create the new product.
  * @method createProduct
  * @return
  */
  createProduct(req, res, next) {

    next();
  },

  /**
  * POST /product/:slug/update
  * Update the product.
  * @method updateProduct
  * @return
  */
  updateProduct(req, res, next) {

    next();
  },

  /**
  * POST /product/:slug/delete
  * Delete the product.
  * @method deleteProduct
  * @return
  */
  deleteProduct(req, res, next) {

    next();
  }
};
