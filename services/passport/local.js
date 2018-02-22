const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const User = require('../../models/user');

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};

passport.use('local-register', new LocalStrategy(options, (req, email, password, done) => {
  if (password !== req.body.confirm) return done(new Error('Passwords do not match'));
  User.create(req.body)
      .then(user => {
        done(null, user)
      })
      .catch(done);
}));

passport.use('local-login', new LocalStrategy(options, (email, password, done) => {
  User.findOne({email})
    .then(user => {
      if(!user) return done(null, false);

      user.isValidPassword(password)
        .then(isEqual => {
          if (!isEqual) return done(null, false);

          done(null, user);
        })
        .catch(done);
    })
    .catch(done);
}));