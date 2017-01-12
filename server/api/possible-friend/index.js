var express    = require('express'),
    router     = express.Router(),
    controller = require('./controller');

module.exports = function (passport) {

  router.post('/', passport.authenticate('facebook-token'), controller.index);

  return router;
}
