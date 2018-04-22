const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

//Set the environment
dotenv.config({ path: '.env.test' });
console.log('ENV', process.env.NODE_ENV);

mongoose.models = {}; //Clean previous models
const User = require('../../../shared/models/user');
const authMiddleware = require('../../../api/middleware/authMiddleware')(User);



describe('authMiddleware', () => {

  before('Connection to db', () => {
    return mongoose.connect('mongodb://localhost:27017/demoshop-test');
  });

  before('Create new user', () => {
    return User.create({ email: 'user@mail.com', password: '12345', group: 'admin' });
  });

  after('Delete all users', () => {
    return User.deleteMany({});
  });

  after('Disconect from db', () => {
    return mongoose.disconnect();
  });

  describe('Login', () => {
    it('it must check that function create the token', () => {
      const req = {
        body: { email: 'user@mail.com', password: '12345' }
      };
      const res = { locals: { token: sinon.spy() } };
      const next = sinon.spy();
      return authMiddleware.login(req, res, next)
        .then(result => {
          expect(res.locals.token).to.not.be.undefined;
        })
        .catch(err => console.log(err));
    });
  });
});