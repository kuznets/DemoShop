const Product = require('../models/product');

/**
 * routes:
 * /product/create
 * /product/:slug/update
 * /product/:slug/delete
 */

module.exports = {

  /**
  * Find all products and put it to locals.
  * @method findAllProducts
  * @return
  */
  findAllProducts(req, res, next) {
    Product.find()
      .then(products => {
        res.locals.products = products;
        next();
      })
      .catch(next);
  },

  /**
  * GET /product/:slug
  * Find one product from db and put it to locals.
  * @method findOneProduct
  * @return
  */
  findOneProduct(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then(product => {
        res.locals.product = product;
        next();
      })
      .catch(next);
  },

  /**
  * POST /product/create
  * Create the new product.
  * @method createProduct
  * @return
  */
  createProduct(req, res, next) {
    Product.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      amount: req.body.amount, 
      img_url: req.body.img_url
    })
      .then(() => res.redirect('/admin/products'))
      .catch(next);
  },

  /**
  * POST /product/:slug/update
  * Update the product.
  * @method updateProduct
  * @return
  */
  updateProduct(req, res, next) {
    Product.findOneAndUpdate({ slug: req.params.slug}, req.body)
      .then(product => res.redirect('/admin/products'))
      .catch(next);
  },

  /**
  * POST /product/:slug/delete
  * Delete the product.
  * @method deleteProduct
  * @return
  */
  deleteProduct(req, res, next) {
    Product.deleteOne({ slug: req.params.slug})
      .then(() => res.redirect('/admin/products'))
      .catch(next);
  }
};
