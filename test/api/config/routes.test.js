const express = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { expect } = require('chai');
const dotenv = require("dotenv");

//Set the environment
dotenv.config({ path: '.env.test' });
console.log('ENV', process.env.NODE_ENV);

mongoose.models = {}; //Clean previous models
const Product = require('../../../shared/models/product');
const User = require('../../../shared/models/user');
const passport = require('../../../shared/services/passport/passport');
const apiRouter = require('../../../api/config/routes');

const api = express();

api.use(express.json());
api.use(apiRouter);
api.use(passport.initialize());


const request = supertest(api);

describe('/api', () => {
  let product1 = new Product({ slug: 'book', title: 'Detective' });
  let product2 = new Product({ slug: 'food', title: 'pizza' });
  let product3 = new Product({ slug: 'car', title: 'tesla' });

  let token;

  before('Connection to db', () => {
    return mongoose.connect('mongodb://localhost:27017/demoshop-test');
  });

  before('Initialize products db', () => {
    return Product.insertMany([product1, product2, product3]);
  });

  before('Create new user', () => {
    return User.create({ email: 'user@mail.com', password: '12345', group: 'admin'});
  });

  before('Get the user token', () => {
    return request.post('/token')
      .send({ email: 'user@mail.com', password: '12345'})
      .then(res => { 
        token = res.body.token;
      })
      .catch(err => console.log(err));
  });

  after('Delete all users', () => {
    return User.deleteMany({});
  });

  after('Clean products db', () => {
    return Product.deleteMany({});
  });

  after('Disconect from db', () => {
    return mongoose.disconnect();
  });

  //Get all products
  describe('GET /products', () => {
    it('it should return a list of products', () => {
      return request.get('/products')
      .expect(201)
      .expect(res => {
        expect(res.body).to.have.length(3);
      });
    });
  });

  //Get one product
  describe('GET /product/:slug', () => {
    it('it should return a product by slug', () => {
      return request.get('/product/book')
      .expect(201)
      .expect(res => {
        expect(res.body.slug).to.equal('book');
      });
    });
  });

  //Create new product
  describe('POST /product', () => {
    it('it should create a new product', () => {
      return request.post('/product')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send({ slug: 'phone', title: 'Nokia 3310' })
        .expect(201)
        .then(res => {
          expect(res.body.title).to.equal('Nokia 3310');
        })
        .catch(err => console.log(err));
    });
  });

  describe('PUT /product/:slug', () => {
    it('it should update the product', () => {
      return request.put('/product/book')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send({ title: 'nodejs' })
        .expect(201)
        .then(res => {
          expect(res.body.title).to.equal('nodejs');
        });
    });
  });

  describe('DELETE /product/:slug', () => {
    it('it should delete the product', () => {
      return request.delete('/product/book')
        .set('Authorization', 'bearer ' + token)
        .expect(204);
    });
  });
});