/**
 * routes:
 * /products
 */

module.exports = Product => ({

  /**
   * GET /api/products
   * Show products.
   * @method findAllProducts
   * @return JSON
   */
  findAllProducts(req, res, next) {
    let queryParams = null;
    if (req.query != undefined && req.query.sort != undefined) {
      let params = req.query;
      queryParams = params.sort > 0 ? params.type : `-${params.type}`;
    }

    return Product.find({})
      .sort(queryParams)
      .then(products => res.status(201).json(products))
      .catch(next);
  },

  /**
   * GET /api/product/:slug
   * Show one product.
   * @method getOneProduct
   * @return JSON
   */
  getOneProduct(req, res, next) {
    if (req.params.slug === undefined) return res.sendStatus(400);
    return Product.findOne({ slug: req.params.slug })
      .then(product => res.status(201).json(product))
      .catch(next);
  },

  /**
   * POST /api/product
   * Create one product.
   * @method getOneProduct
   * @return JSON
   */
  createProduct(req, res, next) {
    return Product.create(req.body)
      .then(product => {
        res.status(201).json(product);
      })
      .catch(next);
  },

  /**
   * PUT /api/product/:slug
   * Edit the product.
   * @method updateOneProduct
   * @return JSON
   */
  updateOneProduct(req, res, next) {
    return Product.findOne({ slug: req.params.slug })
      .then(product => {
        if (!product) return res.sendStatus(404);
        req.product = product;
        req.product = Object.assign(req.product, req.body);
        return req.product.save()
          .then(product => res.status(201).json(product))
          .catch(next);
      })
      .catch(next);
  },

  /**
   * DELETE /api/product/:slug
   * Delete the product.
   * @method deleteOneProduct
   * @return JSON
   */
  deleteOneProduct(req, res, next) {
    return Product.deleteOne({ slug: req.params.slug })
      .then(() => res.sendStatus(204))
      .catch(next);
  },

});
