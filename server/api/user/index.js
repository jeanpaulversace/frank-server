var express    = require('express'),
    router     = express.Router(),
    controller = require('./controller');

module.exports = function (passport) {

  router.get('/:id', passport.authenticate('facebook-token'), controller.show);
  router.patch('/:id', passport.authenticate('facebook-token'), controller.update);

  return router;
}
