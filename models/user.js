const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    trim: true,
    minlength: [7, 'Email is to short.'],
    maxlength: [256, 'Email is to long.'],
    match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Wrong e-mail address format.']
  },
  password: { type: String, required: true },
  username: String,
  photo: String,
  oauth: {
    github: {}
  }
}, {
    timestamps: true
  });

User.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

User.post('save', function (error, user, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email address is busy.'));
  } else {
    next(error);
  }
});

User.methods.isValidPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

User.statics.authenticate = function (email, password) {
  return this.findOne({ email })
    .then(user => {
      if (!user) {
        let error = new Error('User not found.');
        error.status = 401;
        throw error;
      }

      return bcrypt.compare(password, user.password)
        .then(isEqual => {
          if (!isEqual) {
            let error = new Error('Wrong password');
            error.status = 401;
            throw error;
          }

          return user;
        });
    });
};

module.exports = mongoose.model('Users', User);