//Manages requests coming from the client (chatterbox client);
var models = require('../models');
var db = require('../db');



// var insert = function(table, columns)

module.exports = {
  headers: {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  },

  messages: {
    get: function (req, res) {
      res.writeHead(200, this.headers);
      models.messages.get(function(data) {
        res.end(JSON.stringify(data));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.writeHead(201, this.headers);
      res.end(models.messages.post(req.body));
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.writeHead(200, this.headers);
      models.users.get(function(data) {
        res.end(JSON.stringify(data));
      });
    },
    post: function (req, res) {
      console.log('inside usernames post');
      res.writeHead(201, this.headers);
      res.end(models.users.post(req.body.username));
    }
  }
};
