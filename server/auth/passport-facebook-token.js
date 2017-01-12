var FacebookTokenStrategy = require('passport-facebook-token');
var User = require('../api/user/user');
var configAuth = require('../config/auth');

module.exports = function(passport) {

  // serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err,user) {
      done(err, user);
    });
  });

  // Configure FacebookTokenStrategy
  passport.use(new FacebookTokenStrategy(
    {
      // pull in our app id, etc. from our auth.js file
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret
    },
    function(accessToken, refreshToken, profile, done) {

      process.nextTick(function() {
        // find the user in the database based on their facebook id
        User.findOne({ 'facebookId' : profile.id }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);

            // if the user is found, then log them in
            if (user) {
              if (user.accessToken != accessToken) {
                user.accessToken = accessToken;
                user.save(function(err) {
                  if (err)
                    throw err;

                  return done(null, user);
                });
              } else {
                return done(null, user); // user found, return that user
              }
            } else {
              console.log("New user being created!");

              // if there is no user found with that facebook id, create them
              var newUser = new User();

              // set all of the facebook information in our user model
              newUser.facebookId    = profile.id; // set the users facebook id
              newUser.accessToken = accessToken; // we will save the token that facebook provides to the user
              newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
              newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
              newUser.phoneNumber = "";

              // save our user to the database
              newUser.save(function(err) {
                if (err)
                  throw err;

                // if successful, return the new user
                return done(null, newUser, { isNew: true });
              });
           }
        });
    });
  }));

}
