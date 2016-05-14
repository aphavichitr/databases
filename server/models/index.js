var db = require('../db');
var _ = require('underscore');
var Promise = require('bluebird');
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
    post: function (body, respond) {
      var message = body.message;
      var room = body.roomname;
      var username = body.username;
      var selectUser = "SELECT id FROM usernames WHERE name ='" + username + "'";
      var selectRoom = "SELECT id FROM rooms WHERE name ='" + room + "'";
      var insertUser = "INSERT INTO usernames (name) VALUES ('" + username + "')";
      var insertRoom = "INSERT INTO rooms (name) VALUES ('" + room + "')";

     

      var write = function(query) {
        return new Promise(function(resolve, reject) {
          db.query(query, function(err, result) {
            if (err) {
              reject(err);
              console.log('Error! Could not write entire message to messages table ------------>', err);
            } else {
              console.log('Success! Just wrote ' + result + ' to the messages table ------------>', JSON.stringify(result));
              resolve(result);
            }
          });          
        });
      };

      var insertMessage = function() {
        write('INSERT INTO messages (text, id_usernames, id_rooms) VALUES ("' + message + '", (SELECT id FROM usernames WHERE name ="' + username + '"), (SELECT id from rooms WHERE name ="' + room + '"))')
          .then(respond);
      };

      



      //Checks for existing username, returns username or empty string if it does not exist
      write(selectUser)
        .then((user) => {
          if (user.length === 0) {
            write(insertUser)
              .then(() => {
                write(selectRoom) 
                  .then((room) => {
                    if (room.length === 0) {
                      write(insertRoom)
                        .then(insertMessage);
                    } else {
                      insertMessage();
                    }
                  });
              });
          } else {
            insertMessage();
          }
        });

      // db.query(selectUser, function(err, result) {
      //   if (err) {
      //   } else {
      //     console.log('Success Query! Here is the resulting username if they exist --------->', JSON.stringify(result));

      //     if (result.length === 0) {
      //       db.query(insertUser, function(err, result) {
      //         if (err) {
      //         } else {
      //           console.log('Success! Just wrote the username to the usernames table --------->', JSON.stringify(result));

      //           db.query(selectRoom, function(err, result) {
      //             if (err) {
      //             } else {
      //               console.log('Success Query! Here is the resulting room if they exist --------->', JSON.stringify(result));

      //               if (result.length === 0) {
      //                 db.query(insertRoom, function(err, result) {
      //                   if (err) {
      //                   } else {
      //                     console.log('Success! Just wrote the room to the rooms table ----------->', JSON.stringify(result));
      //                     writeToMessage(cb);
      //                   }
      //                 });
      //               } else {
      //                 writeToMessage(cb);
      //               }


      //             }
      //           });
      //         }
      //       });
      //     } else {
      //       writeToMessage(cb);
      //     }
      //   }
      // });


      



      

      
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

