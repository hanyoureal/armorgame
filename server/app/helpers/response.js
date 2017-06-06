// Use to automatically return a json response
function sendJSONresponse(prop) {
  return function(req, res, next) {
    res.json(req.resources[prop]);
  }
}

module.exports.toJSON = sendJSONresponse;
