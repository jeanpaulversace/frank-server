var handlers = {}

handlers.respondWithResult = function (res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      if( Object.prototype.toString.call( entity ) != '[object Array]' ) {
        entity = [entity];
      }
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

handlers.handleError = function (res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

handlers.handleEntityNotFound = function (res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

module.exports = handlers;
