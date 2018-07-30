var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://"+process.env.IP+":27017/siple-node");


//var mongo = require("mongodb");
//for local
//var db, uri = "mongodb://"+process.env.IP+":27017";
//for c9
//uri = "mongodb://"+process.env.IP+":27017";

mongoose.connection.on('error', function(){
  console.log('Could not connect to mongodb');
});

var userSchema = new mongoose.Schema({
  name: {
    type:String,
    required: "Name is required"},
  email: String
});

var User = mongoose.model('User', userSchema);

//mongo.MongoClient.connect(uri, {useNewUrlParser:true},
//function(err,client){
 // if(err){
  //  console.log(("Could not connect to MongoDB"));
  //}else{
 //   db = client.db('siple-node');
 // }
//});
//var save = function(form_data){
 // db.createCollection('users', function(err, collection){});
  //var collection = db.collection('users');
 // collection.save(form_data);
//}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var server = http.Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.get('/form', function(req, res){
  res.sendFile(__dirname+'/form.html');
});

app.post('/submit_user', function(req, res){
  console.log(req.body);
  var new_user = new User(req.body);
  new_user.save(function(err,data){
    if(err)
    return res.status(400).json({message:"Could not save user"});
    res.status(200).json(data);
  });
  //save(req.body);
  res.status('200');
});

app.get('/system/about', function(req, res){
  res.sendFile(__dirname+'/about.html');
});

server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
    console.log('Server running');
});