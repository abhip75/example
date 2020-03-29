const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql');
const port = 8080
app.use(express.static(__dirname + '/projt'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());



app.get('/',function(req,res){
  res.sendFile('index.html',{root:__dirname})
});
var connection = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password: '',
  database: 'user',
});
connection.connect(function(err){
  if(err) throw err;
  console.log('Connected....');
})
app.post('/submit',function(req,res){
  console.log(req.body);

  var sql = "insert into person values('"+req.body.username +"','"+req.body.email+"')";
  connection.query(sql,function(err){
    if(err) throw err
    res.render('index',{title:'Data Saved',
    message: 'Data Saved successfully..'})
        })
  connection.end();
})
app.listen(port,() => console.log(`app listening on port 8080!`))
