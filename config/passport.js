const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('./keys');

module.exports = function (passport) {
  
  passport.use(new LinkedInStrategy({
    clientID: keys.ClientID,
    clientSecret: keys.ClientSecret,
    callbackURL: "http://localhost:5000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true,
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  }, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, false);
  });
}