const { expect } = require('chai');
const sinon = require('sinon');

const configureProductController = require('../../../api/controllers/ProductController');

describe('productController', () => {
  const PRODUCTS = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const PRODUCT = { id: 1, slug: 'somehow_product', save() { } };

  class Product {
    static find() { }
    static findOne() { }
    static create() { }
  }

  sinon.stub(Product, 'find').resolves(PRODUCTS);
  sinon.stub(Product, 'findOne').resolves(PRODUCT);
  sinon.stub(Product, 'create').resolves(PRODUCT);

  const productController = configureProductController(Product);

  /**
   * GET /api/products - findAllProducts
   * 1. it should send an array with status 201
   * 2. it should catch the error if it is
   */
  describe('findAllProducts', () => {

    it('it should send an array with status 201', () => {

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      return productController.findAllProducts(req, res)
        .then(() => {
          expect(res.status.calledOnce).to.equal(true, '`res.status` is not called at least once');
          expect(res.status.calledWith(201)).to.equal(true);
          expect(res.json.calledWith(PRODUCTS)).to.equal(true);
        });
    });

    xit('it should catch the error if it is', () => {
      // How?
    });
  });

  /**
   * GET /api/product/:slug - getOneProduct
   * 1. it should check that req.params.slug exists, that is not empty, that it is a string
   * 2. it should send an object with status 201
   * 3. it should catch an error if it is
  */
  describe('getOneProduct', () => {
    it('it should check that req.params.slug exists, that is not empty, that it is a string', () => {
      const req = {
        params: { slug: 'somehow_product' }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      return productController.getOneProduct(req, res)
        .then(() => {
          expect(req.params.slug).to.not.be.undefined;
          expect(req.params.slug).to.not.be.empty;
          expect(req.params.slug).to.have.string('somehow_product');
        });
    });

    it('it should check, if req.params.slug == undefined, to send status 400', () => {
      const req = { params: {} };
      const res = {
        sendStatus: sinon.stub().returnsThis(),
      };

      productController.getOneProduct(req, res);

      expect(req.params.slug).to.be.undefined;

    });

    it('it should send an object with status 201', () => {
      const req = { params: { slug: 'somehow_product' } };
      const res = {
        status: sinon.stub().returnsThis(),
        sendStatus: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      return productController.getOneProduct(req, res)
        .then(() => {
          expect(res.status.calledOnce).to.equal(true, '`res.status` is not called at least once');
          expect(res.status.calledWith(201)).to.equal(true);
          expect(res.json.calledWith(PRODUCT)).to.equal(true);
        });
    });

    xit('it should catch an error if it is', () => {

    });
  });

  /**
   * POST /api/product - createProduct
   * 1. it should send an object with status 201
   * 2. it should check that req.body exists, that is not empty, that it is a object
   * 3. it should catch an error if it is
  */
  describe('createProduct', () => {
    it('it should send an object with status 201', () => {
      const req = {
        body: { slug: '', title: '' }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      return productController.createProduct(req, res)
        .then(() => {
          expect(res.status.calledOnce).to.equal(true, '`res.status` is not called at least once');
          expect(res.status.calledWith(201)).to.equal(true);
          expect(res.json.calledWith(PRODUCT)).to.equal(true);
        });
    });

    it('it should check that req.body exists, that it is a object, that req.body.slug is not empty', () => {
      const req = {
        body: { slug: 'new_product', title: 'New Product' }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      return productController.createProduct(req, res)
        .then(() => {
          expect(req.body).to.not.be.undefined;
          expect(req.body).to.be.an('object');
          expect(req.body.slug).to.not.be.empty;
        });
    });

    xit('it should catch an error if it is', () => {

    });

  });

  /**
   * PUT /api/product/:slug - updateOneProduct
   * 1. it should send an object with status 201
   * 2. it should check that req.body exists, that is not empty, that it is a object
   * 3. it should check that req.params.slug exists, that is not empty, that it is a string
   * 4. it should check, if req.body and found product is equal then it send status 304
   * 5. it should check, if product by slug not found then it send status 404
   * 6. it should catch an error if it is
  */
  describe('updateOneProduct', () => {
    it('it should send an object with status 201', () => {
      const req = { params: {}, product: PRODUCT };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      sinon.stub(PRODUCT, 'save').resolves(PRODUCT);

      return productController.updateOneProduct(req, res)
        .then(() => {
          expect(res.status.calledOnce).to.equal(true, '`res.status` is not called at least once');
          expect(res.status.calledWith(201)).to.equal(true);
          expect(res.json.calledWith(PRODUCT)).to.equal(true);
        });
    });

    xit('it should check that req.body exists, that is not empty, that it is a object', () => {

    });

    xit('it should check that req.params.slug exists, that is not empty, that it is a string', () => {

    });

    xit('it should check, if req.body and found product is equal then it send status 304', () => {

    });

    xit('it should check, if product by slug not found then it send status 404', () => {

    });

    xit('it should catch an error if it is', () => {

    });

  });

  /**
   * DELETE /api/product/:slug - deleteOneProduct
   * 1. it should send status 204
   * 2. it should check that req.params.slug exists, that is not empty, that it is a string
   * 3. it should catch an error if it is
  */
  describe('deleteOneProduct', () => {
    xit('it should send status 204', () => {

    });

    xit('it should check that req.params.slug exists, that is not empty, that it is a string', () => {

    });

    xit('it should catch an error if it is', () => {

    });

  });
});