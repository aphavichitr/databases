/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('Usernames', {
  'username': Sequelize.STRING(25)
});

var Message = db.define('Messages', {
  'id_usernames': Sequelize.INTEGER,
  'messages': Sequelize.STRING,
  'id_rooms': Sequelize.INTEGER
});

var Rooms = db.define('Rooms', {
  'roomname': Sequelize.STRING(25)
});

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
