var mysql = require('mysql');
exports.connection = function() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat'
  });

  return connection;
};


// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


