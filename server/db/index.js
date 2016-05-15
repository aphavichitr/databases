var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('Usernames', {
  'username': Sequelize.STRING(25)
}, {timestamps: false});

var Message = db.define('Messages', {
  'id_usernames': Sequelize.INTEGER,
  'message': Sequelize.STRING,
  'id_rooms': Sequelize.INTEGER
}, {timestamps: false});

var Rooms = db.define('Rooms', {
  'roomname': Sequelize.STRING(25)
}, {timestamps: false});

Message.belongsTo(User);
Message.belongsTo(Rooms);

User.hasMany(Message);
Rooms.hasMany(Message);

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
User.sync();
Message.sync();
Rooms.sync();

exports.User = User;
exports.Message = Message;
exports.Rooms = Rooms;







// var mysql = require('mysql');
// exports.connection = function() {
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'chat'
//   });

//   return connection;
// };


// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


