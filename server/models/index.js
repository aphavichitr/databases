var db = require('../db');
db = db.connection();
// var connection = function() {
//   db.connection.connect(function(err) {
//     if (err) {
//       console.log('There was an error connecting.\n', err);
//     }
//     console.log('Connection successful!');
//   });
// };

// var endConnection = function() {
//   db.connection.end(function(err) {
//     if (err) {
//       console.log('There was an error disconnecting.\n', err);
//     }
//     console.log('Disconnect successful!');
//   });
// };

//db.connection.connect;


module.exports = {
  messages: {
    get: function (cb) {
      db.query("SELECT * FROM messages", function(err, result) {
        if (err) {
          console.log('Error Messages Get -------------------------->', err);

        } else {
          cb(result);
        }
      });
    }, // a function which produces all the messages
    post: function (req) {
      var message = req.message;
      var room = req.roomname;
      var username = req.username;

      var sql = 'INSERT INTO messages (text, id_usernames, id_rooms) VALUES ("' + message + '", (SELECT id FROM usernames WHERE name ="' + username + '"), (SELECT id from rooms WHERE name ="' + room + '"))';
      console.log('POST -------------->', sql);

      db.query(sql, function(err, result) {
        if (err) {
          console.log('Error Messages Post -------------------------->', err);

        } else {
          console.log('Success Messages Post-------------------------->', JSON.stringify(result));

          return result;
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (cb) {
      db.query("SELECT * FROM usernames", function(err, result) {
        if (err) {
          console.log('Error Users Get -------------------------->', err);

        } else {
          cb(result);
        }
      });
    },
    post: function (req) {
      console.log('post!!!');
      db.query("INSERT INTO usernames (name) VALUES ('" + req + "')", function(err, result) {
        if (err) {
          console.log('Error Users Post-------------------------->', err);
        } else {
          console.log('Success Users Post-------------------------->', JSON.stringify(result));

          return result;
        }
      });
    }
  }
};

