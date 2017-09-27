var mysql = require('mysql');

var db_config = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: 'deneme'
};
var connection;
connection = mysql.createConnection(db_config);
connection.connect(function (err) {
    if (err) {
        console.log('database error', err);
    }
});

module.exports = connection;