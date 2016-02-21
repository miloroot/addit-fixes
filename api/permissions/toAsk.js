module.exports = function(modelName, method, query, req, res) {
   var config = require(process.cwd() + '/config'),
   sha256 = require('sha256');

   
   // Allow user to be created
   if (modelName == "User" && method == "POST" && req.body.username && req.body.password) {
      // Encrypt password before creating account
      req.body.password = sha256(config.hashSalt + req.body.password);
      return true;
   }

   if (req.method != "GET" && !req.session.user) {
      return false;
   }
   return true;
};