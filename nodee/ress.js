var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"integra"
});

app.get('/listUsers', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("select * from node where id=1",'utf8', function (err, result) {
      if (err) throw err;
      console.log(result);
      res.end(JSON.stringify(result));
    });
  });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})