var formatter = {};

formatter.formatForGETRequest = function (query) {
  delete query["access_token"];

  query["createdAt"] = new Date(query["createdAt"]);
  query["updatedAt"] = new Date(query["updatedAt"]);

  return query;
}


module.exports = formatter;
