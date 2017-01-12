var express    = require('express'),
    router     = express.Router(),
    controller = require('./controller');

module.exports = function (passport) {

  router.post('/search/', passport.authenticate('facebook-token'), controller.search);
  router.post('/', passport.authenticate('facebook-token'), controller.create);

  return router;
}
