var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"integra"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("select * from node where id=1", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });