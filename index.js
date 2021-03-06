var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql');

var db_config = {
  host     : 'us-cdbr-iron-east-02.cleardb.net',
  user     : 'b44ace26fea6f3',
  password : 'ea11b339',
  database : 'heroku_c9cba001b0caa9d'
}


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/trees');
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/tree", function(req, res){
  var connection = mysql.createConnection(db_config);
  connection.connect(function(err) {if (err) throw err;});
  connection.query('SELECT * FROM products WHERE product_id = ?', req.query.id, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render(__dirname + "/tree1.html", {
        id: req.query.id,
        result: result[0]
        // name: result[0].product_name,
        // description: result[0].description,
        // price: result[0].price,
        // category: result[0].category,
        // growth_rate: result[0].growth_rate,
        // height: result[0].height
      });
  });
  connection.end();
});

app.get("/logon", function(req, res){
  var connection = mysql.createConnection(db_config);
  console.log(req.query.user);
  console.log(req.query.pass);
  connection.connect(function(err) {if (err) throw err;});
  connection.query(`SELECT * FROM users WHERE username = '${req.query.user}' AND password = '${req.query.pass}'`, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render(__dirname + "/accountpage.html", {
      users: result
    });
  });
  connection.end();
});

app.get("/signup", function(req, res){
  var connection = mysql.createConnection(db_config);
  console.log(req.query.user);
  console.log(req.query.pass);
  connection.connect(function(err) {if (err) throw err;});
  connection.query(`INSERT INTO users (username, PASSWORD, email, customer_status) VALUES ('${req.query.username}','${req.query.password}','${req.query.email}','user')`, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.sendFile(__dirname + "/index.html");
  });
  connection.end();
});

app.get("/search", function(req, res){
  var connection = mysql.createConnection(db_config);
  connection.connect(function(err) {if (err) throw err;});

  var queryString = `SELECT * FROM products WHERE price > '${req.query.pricemin}' AND price < '${req.query.pricemax}' AND height > '${req.query.heightmin}' AND height < '${req.query.heightmax}'`;

  if(req.query.name){
    queryString += ` AND product_name LIKE '%${req.query.name}%'`
  }

  if(req.query.category){
    queryString += ` AND category LIKE '${req.query.category}'`
  }

  if(req.query.growthrate){
    queryString += ` AND growth_rate LIKE '${req.query.growthrate}'`
  }

  console.log(queryString);

  connection.query(queryString, function(err, result) {
    if (err) throw err;
    res.render(__dirname + "/listings.html", {
      products: result
    });
  });
  connection.end();
}); // listingsserach page then do results 0, 1, 2 etc

app.get("/listings", function(req, res){
  var connection = mysql.createConnection(db_config);
  connection.connect(function(err) {if (err) throw err;});
  connection.query('SELECT * FROM products', function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render(__dirname + "/listings.html", {
        products: result
      });
  });
  connection.end();
});

app.get("/login", function(req, res){
  res.sendFile(__dirname + "/login.html");
});

app.get("/cart", function(req, res){
  res.sendFile(__dirname + "/cart.html");
});

app.get('/test',function(req,res){
    var connection = mysql.createConnection(db_config);
    connection.connect(function(err) {if (err) throw err;});
    connection.query('SELECT * FROM products', function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
    connection.end();
});

app.listen(port);
console.log(`Example app listening on port ${port}!`)
