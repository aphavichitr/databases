//Manages requests coming from the client (chatterbox client);
var models = require('../models');
var db = require('../db');

var User = db.User;
var Message = db.Message;
var Rooms = db.Rooms;

// var insert = function(table, columns)

module.exports = {
  headers: {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10,
    'Content-Type': 'application/json' // Seconds.
  },

  messages: {
    get: function (req, res) {
      // models.messages.get(function(data) {
      //   res.writeHead(200, this.headers);
      //   res.end(JSON.stringify(data));
      // });
      console.log('MESSAGE ===========================>', db.Message);
      Message.findAll({include: [User, Rooms]})
        .complete(function(err, results) {
          res.json(results);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // models.messages.post(req.body, function(result) {
      //   res.writeHead(201, this.headers);
      //   res.end(JSON.stringify(result));
      // });
      User.findOrCreate({username: req.body.username})
        .complete(function(err, user) {
          Rooms.findOrCreate({roomname: req.body.roomname})
            .complete(function(err, room) {
              var params = {
                message: req.body.text,
                'id_usernames': user.id,
                'id_rooms': room.id  
              };

              Message.create(params)
                .complete(function(err, results) {
                  res.sendStatus(201);
                });
            });
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

      User.findAll()
        .complete(function(err, results) {
          res.json(results);
        });
      // models.users.get(function(data) {
      //   res.writeHead(200, this.headers);
      //   res.end(JSON.stringify(data));
      // });
    },
    post: function (req, res) {
      console.log('inside usernames post');
      User.create({username: req.body.username})
        .complete(function(err, user) {
          res.sendStatus(201);
        });

      // models.users.post(req.body, function(result) {
      //   res.writeHead(201, this.headers);
      //   res.end();
      // });
    }
  }
};
