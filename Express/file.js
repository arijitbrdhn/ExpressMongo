var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoClient=require('mongodb').MongoClient;
var url ='mongodb://localhost/affle';
mongoClient.connect(url,function(err,db)
{
	console.log("database is connected");
	
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

db.createCollection("user",{
	validator:{
		email:{$regex:/@gmail\.com$/}
	}
	}
);
app.post('/signUp',function(req,res)
{ 
 
	
    db.collection("user").insertOne({"userName":req.body.userName,"userPassWord":req.body.userPassWord,"userEmail":req.body.userEmail,"userPhoneNo":req.body.userPhoneNo});
    res.send("data is successfully saved..");
});
app.post('/update/:id',function(req,res)
{
   db.collection("user").findOne({"userEmail":req.params.id},function(err,data)
     {
		if(err)
		{
			res.send(err);
		}
		else if(data==null)
		{
			res.send("Data invaild or not come");
		}
		else
		{
		   if(req.body.userName!=undefined)
		   {
		      col.update({"userEmail": req.params.id},{$set:{"userName":req.body.userName}});	
		   }
		   if(req.body.userPassWord!=undefined)
		   {
		      col.update({"userEmail": req.params.id},{$set:{"userPassWord":req.body.userPassWord}});	
		    }
	       if(req.body.userPhoneNo!=undefined)
	       {
		     col.update({"userEmail": req.params.id},{$set:{"userPhoneNo":req.body.userPhoneNo}});	
		   }
		   if(req.body.userEmail!=undefined)
		   {
		      col.update({"userEmail": req.params.id},{$set:{"userEmail":req.body.userEmail}});	
		   }
        }
    })
});


app.get('/userDetail',function(req,res){

 db.collection('user').findOne(function(err,data){
 	res.send(data);
 })

 })

app.post('/login',function(req,res)
{
  var userName=req.body.userName;
  var passWord=req.body.userPassWord;
  console.log("login")
  col.findOne({"userName":userName,"userPassWord":passWord},function(err,data)
   {
	 console.log(data);
	   if(err)
	    {
		  res.send(err)
	    }
	   if (data==null)
	   {
	    res.send("invalid Credentials")
	   }
	   else 
	   {
	    res.send("valid Credentials")
	   }
   }
);



   })




});
 app.listen(8054);