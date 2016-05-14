var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/classes', router);

// Serve the client files
app.use(express.static(__dirname + '/../client'));


// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

// db.connection.connect(function(err) {
//   if (err) {
//     console.log('There was an error connecting.\n', err);
//   }
//   console.log('Connection successful!');
// });

// var sql = "INSERT INTO rooms (name) VALUES ('Cafeteria')";

// db.connection.query(sql, function(err, res) {
//   if (err) {
//     console.log('Holy crap there was error in query', err);
//   } else {
//     console.log('Actually it worked -------->', res);
//   }
// });