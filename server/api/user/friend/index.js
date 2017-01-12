var express = require('express'),
    router  = express.Router();

var controller = require('./controller');

module.exports = function (passport) {

  router.get('/:id', passport.authenticate('facebook-token'), controller.show);
  router.patch('/:id', passport.authenticate('facebook-token'), controller.create);
  router.delete('/:id', passport.authenticate('facebook-token'), controller.delete);

  return router;
}
