const passport = require('passport');
const {Strategy: GitHubStrategy} = require('passport-github');
const User = require('../../models/user');

const config = require('../../config/app');

passport.use(new GitHubStrategy(config.oauth.github, 
  (accessToken, refreshToken, profile, done) => {
    if (!profile.emails) return done(null, false, {message: 'Before login, you need to add email on GitHub.'});
    let email = profile.emails[0].value;
    let username = profile.username;
    let photo = profile.photos[0].value;

    let githubProfile = {
      id: profile.id,
      displayName: profile.displayName,
      photo
    }

    User.findOneAndUpdate({email}, {
      email,
      username,
      photo,
      githubProfile
    }, {upsert: true, new: true}, done);
  }));