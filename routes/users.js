var express = require('express');
var database = require('./database');
var router = express.Router();

router.post('/userSave',function (req,res) {

    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;

    database.query('INSERT INTO users(name,surname,email) values(?,?,?)',[name,surname,email],function (err,data) {
        if (err){
            res.send({code:400,message:"db hatası"});
        }
        else{
            res.send({code:200,message:"kayıt başarılı"});
        }
    });
});
router.get('/userList',function (req,res) {
    res.end('userList');

    database.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
router.get('/userLogin',function (req,res) {
    res.send('userLogin')
});
module.exports = router;