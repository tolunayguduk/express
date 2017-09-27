var express = require('express');
var path = require('path');
var users = require('./routes/users');
var app = express();
app.use('/img',express.static(__dirname + '/public/img'));
app.use('/style',express.static(__dirname + '/public/style'));

app.get('/',function (req,res) {
    console.log('Connected...');
    res.end();
});
app.use('/chat',function (req,res) {
    res.sendFile(__dirname + '/public/chat.html');
});
app.use('/users',users);
app.use(function (req,res) {
   res.sendFile(__dirname + '/public/error.html');
});



var server = app.listen(3000,function () {
    console.log('... Server On Air ...');
});
var io = require('socket.io').listen(server);

io.sockets.on('connection',function (socket) {
    socket.on('gonder',function (data) {
       socket.broadcast.emit('alici',data);
    });
});



