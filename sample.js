var express = require('express');
var app=express();
var http =require('http');
var path=require('path');
var bodyParser=require('body-parser');

//all environments
// app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname,'views'));
// app.set('view engine','html');
// app.use(express.json());
// app.use(express.static(path.join(__dirname,'public')));
var urlencodedParser=bodyParser({extended:false})
// app.use(express.static('public'));

app.use(express.urlencoded());

var mysql=require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sample',
    port:'3306'
})

app.post('/old', function(req,res){
    var createNames = {
        id: req.body.id,
        name: req.body.name,
    }
    console.log("Database is connected..");
    connection.query("insert into details set ?",createNames, function(err, result){

        if(err)throw err;
        console.log(result);
        // res.send(result);
        res.sendFile(__dirname + "/" +"new.html");
        
        
    })    
});

app.post("/delete/:id" , function (req, res) {
    connection.query("delete from details where id=?",req.body.id, function (err, result) {

      if (err) throw err;
      console.log('Deleted!')
      console.log(result);
      res.send(result);
    })
    connection.query("select * from details", function (err, result) {

      if (err) throw err;
      console.log(result);
    })
    });

app.get('/delete', function (req, res) {
res.sendFile( __dirname + "/" + "delete.html" );
})
app.get('/select', function (req, res) {
    res.sendFile( __dirname + "/" + "select.html" );
  });
    
    app.post('/select/:id', function(req, res){
    connection.query("select * from details where id=?",req.body.id, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    })
 })

 app.post('/update/:id', function(req, res) {
    var c = req.body;
    console.log("Updating the table");
    console.log(c.id);
    var params = [c.name, c.id];
    var queries = 
    connection.query('update details SET name = ? where id=?',params, function(err,res){
     if(err) throw err;
     console.log('Updated!');
    });
    connection.query("select * from details", function (err, result) {

      if (err) throw err;
      console.log(result);
      res.send(result);
    })
  });

app.get('/update', function (req, res) {
res.sendFile( __dirname + "/" + "update.html" );
})
 app.get('/listusers', function(req,res){
    connection.query("select * from details", function(err, result){
        if(err)throw err;
        console.log(result);
        res.send(result);
    })
})
app.get('/Home',function(req,res){
    res.sendFile(__dirname + "/" +"new.html");
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s",host,port)
})