var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myapp';

 app.use(bodyParser.urlencoded({
		extended:true
	}));
app.use(bodyParser.json());

 mongoClient.connect(url,function(err,db){

 app.post('/signup',function(req,res){

var eMail = req.body.eMail ;
var userName = req.body.userName ;
var passWord = req.body.passWord ;
var phoneNum = req.body.phoneNum ;
var old = req.body.old ;

  if ((eMail.includes(".com") && eMail.includes("@")) && (phoneNum/phoneNum==1)){

  db.collection('newUsers').insertOne({
    "email" : eMail , "username" : userName , "password" : passWord , "phoneNo" : phoneNum , "age" : old

     });
  } else{
  	res.send("give proper format for email or phoneno.");
  }
   console.log('connected');
    });
app.post('/login',function(req,res){

var username = req.body.username;
var password = req.body.password;
    
db.collection('newUsers').findOne({ "username":username ,"password":password}, function(err,doc){
   
   if (err)
    res.send(err);
  else if (doc==null)
   res.send("Invalid Username or Password");
 else
 	res.send("Welcome");

     })
   }); 

 app.post('/update/:id',function(req,res){

 db.collection('newUsers').findOne({ $or:[{ "email": req.params.id},{ "phoneNo" : req.params.id}]}, function(err,data){
      
    var obj = data;
    
   if (err)
    res.send(err);
   else if (data==null)
   res.send("Invalid email or phoneNo");
   else { 

 	if(req.body.email!= undefined)
    db.collection('newUsers').update({"_id":obj._id},{$set:{"email":req.body.email}}) ;
    if(req.body.username!= undefined)
    db.collection('newUsers').update({"_id":obj._id},{$set:{"username":req.body.username}}) ;
    if(req.body.password!= undefined)
 	db.collection('newUsers').update({"_id":obj._id},{$set:{"password":req.body.password}}) ;
    if(req.body.phoneNo!= undefined)
    db.collection('newUsers').update({"_id":obj._id},{$set:{"phoneNo":req.body.phoneNo}}) ;
    if(req.body.age != undefined)
    db.collection('newUsers').update({"_id":obj._id},{$set:{"age":req.body.age}});

   }
    })
   })
 
 app.get('/profile',function(req,res){

 db.collection('newUsers').findOne(function(err,data){
 	res.send(data);
 })
  })
   });

app.listen(2000);
