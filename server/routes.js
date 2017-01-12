var passport = require('passport');

module.exports = function (app) {

  // passport ==================================================================
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login session

  // auth ======================================================================
  app.use('', require('./auth/facebook-routes')(passport));

  // api routes ================================================================
  app.use('/api/users',require('./api/user/index')(passport));
  app.use('/api/users/friends', require('./api/user/friend/index')(passport));
  app.use('/api/possible-friends', require('./api/possible-friend/index')(passport));
  app.use('/api/friend-requests', require('./api/friend-request/index')(passport));
  app.use('/api/feelings',require('./api/feeling/index')(passport));
}
