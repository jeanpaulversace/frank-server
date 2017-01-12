var express = require('express')
,   router  = express.Router();

module.exports = function(passport) {

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login

  router.post('/auth/facebook/token', function(req, res, next) {
  passport.authenticate('facebook-token', function(err, user, info) {
      if (err) { return next(err); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }

        if (info) {
          return res.status(req.user ? 200 : 401).json({isNew: info.isNew, user: user});
        } else {
          return res.status(req.user ? 200 : 401).json({user: user});
        }

      });

    })(req, res, next);
  });

  return router;
}
