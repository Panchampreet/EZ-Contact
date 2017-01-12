import passport from 'passport';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

exports.setup = function(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'email': profile.emails[0].value
    })
      .then(function(user) {
        if (!user) {
          console.log('profile = ' + JSON.stringify(profile));
          user = new User({
            id: profile.id,
            name: profile.displayName,
            imageurl: profile.photos[0].value,
            email: profile.emails[0].value,
            role: 'user',
            title: 'Software Engineer',
            team: 'Apple',
            organization: 'Customer Service'
          });
          user.saveAsync()
            .then(function(user) {
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
