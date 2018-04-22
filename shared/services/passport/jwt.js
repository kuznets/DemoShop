const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../../models/user');

const config = require('../../../config/app');
const options = {
  secretOrKey: config.auth.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
console.log('JWT.JS');

passport.use(new Strategy(options, (payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (!user) return done(null, false);
      if ( user.group.indexOf('admin') == -1 ) return done(null, false);

      done(null, user);
    })
    .catch(done);
}));