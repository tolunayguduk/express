var express = require('express');
var path = require('path');
var mysql = require('mysql');
var database = require('./routes/database.js');
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
        var string = JSON.stringify(data);
        var json =JSON.parse(string);
        var mesaj = json.mesaj;
        var user = json.user;
        var saat = new Date().getHours();
        if(saat < 10){
            saat = '0'+ saat;
        }
        var dakika = new Date().getMinutes();
        var veri = {
            'mesaj' : mesaj,
            'user' : user,
            'saat' : saat,
            'dakika' : dakika

        }

        var tarih = saat+':'+dakika;

        database.query('INSERT INTO users(name,surname,email) values(?,?,now())',[user,mesaj],function (err,data) {

        });

       io.emit('alici',veri);
    });
});



