var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongresto = require('./mongresto');
// include the multipart middleware for file uploading
var multipart = require('connect-multiparty');
var fs = require('fs');
// include the session module
var session = require('express-session');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Oh happy day!',
  resave: false,
  saveUninitialized: true
}));

var multipartMiddleware = multipart();
app.post('/api/files', multipartMiddleware, function(req, res) {
	console.log("req.files: ", req.files);

  // the recieved file
  var file = req.files.file;

  // read the recieved file
  fs.readFile(file.path, function (err, data) {
    // decide where to store the file
    var uploadPath = __dirname + "/public/upload/" + file.name;

    // write file to file system
    fs.writeFile(uploadPath, data, function (err, data) {
      if (err) throw err;

      // find public path (for <img src=""> tags etc)
      var publicPath = uploadPath.split('/public');
      publicPath = publicPath[publicPath.length-1];

      // and send response
      res.json(publicPath);
    });
  });
});

// Options for Mongresto
var options = {
  dbName: "addit",
  apiPath: "/api",
  modelPath: "./api/mongoose-models/",
  customRoutes: [
    // '/api/login' route
    {
      method: "all",
      path: "login",
      controller: require('./api/custom/login.route')
    }
  ],
  permissionToAsk: require('./api/permissions/toAsk'),
  permissionToAnswer: require('./api/permissions/toAnswer')
};

// Initialize our own REST api - mongresto
mongresto.init(app, options);

app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});

/* error handlers */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("An error occurred: ", err.message, err);
    throw err;
  });
}

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;

