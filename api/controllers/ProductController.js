const Product = require('../../shared/models/product');

/**
 * routes:
 * /products
 */

exports.findAllProducts = findAllProducts;
exports.getOneProduct = getOneProduct;
exports.createProduct = createProduct;
exports.updateOneProduct = updateOneProduct;
exports.deleteOneProduct = deleteOneProduct;

/**
 * GET /api/products
 * Show products.
 * @method findAllProducts
 * @return JSON
 */
function findAllProducts(req, res, next) {
  Product.find()
    .then(products => res.status(201).json(products))
    .catch(next);
}

/**
 * GET /api/product/:slug
 * Show one product.
 * @method getOneProduct
 * @return JSON
 */
function getOneProduct(req, res, next) {
  Product.findOne({ slug: req.params.slug })
    .then(product => res.status(201).json(product))
    .catch(next);
}

/**
 * POST /api/product
 * Create one product.
 * @method getOneProduct
 * @return JSON
 */
function createProduct(req, res, next) {
  console.log('USER: ', req.user);
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next);
}

/**
 * PUT /api/product/:slug
 * Edit the product.
 * @method updateOneProduct
 * @return JSON
 */
function updateOneProduct(req, res, next) {
  Product.findOne({ slug: req.params.slug })
    .then(product => {
      if (!product) return res.sendStatus(404);
      req.product = product;
      console.log('req.body: ', req.body);
      req.product = Object.assign(req.product, req.body);
      console.log('req.product: ', req.product);
      req.product.save()
        .then(product => res.status(201).json(product))
        .catch(next);
      //res.status(200).send('ok');
    })
    .catch(next);
}

/**
 * DELETE /api/product/:slug
 * Delete the product.
 * @method deleteOneProduct
 * @return JSON
 */
function deleteOneProduct(req, res, next) {
  Product.deleteOne({ slug: req.params.slug })
    .then(() => res.sendStatus(204))
    .catch(next);
}