var express    = require('express'),
    router     = express.Router(),
    controller = require('./controller');

module.exports = function (passport) {

  router.get('/', passport.authenticate('facebook-token'), controller.index);
  router.post('/', passport.authenticate('facebook-token'), controller.create);
  router.delete('/:id', passport.authenticate('facebook-token'), controller.delete);
  return router;
}
