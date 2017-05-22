xxvar express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoClient=require('mongodb').MongoClient;
var url ='mongodb://localhost/DB2';
mongoClient.connect(url,function(err,db)
{
	console.log("connected");
	
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var col=db.collection('customer')
app.post('/signUp',function(req,res)
{ 
	
    col.insertOne({"userName":req.body.userName,"passWord":req.body.passWord,"email":req.body.email,"phoneNo":req.body.phoneNo});
    res.send("data saved succesfully");
});
app.post('/updateUser/:id',function(req,res)
{
   col.findOne({"email":req.params.id},function(err,data)
     {
		if(err)
		{
			res.send(err);
		}
		else if(data==null)
		{
			res.send("Data is not came");
		}
		else
		{
		   if(req.body.userName!=undefined)
		   {
		      col.update({"email": req.params.id},{$set:{"userName":req.body.userName}});	
		   }
		   if(req.body.passWord!=undefined)
		   {
		      col.update({"email": req.params.id},{$set:{"passWord":req.body.passWord}});	
		    }
	       if(req.body.phoneNo!=undefined)
	       {
		     col.update({"email": req.params.id},{$set:{"phoneNo":req.body.phoneNo}});	
		   }
		   if(req.body.email!=undefined)
		   {
		      col.update({"email": req.params.id},{$set:{"email":req.body.email}});	
		   }
        }
    })
});


app.get('/profile/:userPhone',function(req,res){

 db.collection('customer').findOne({phoneNo:req.params.userPhone},function(err,data){
 	res.send(data);
 })

 })

app.post('/login',function(req,res)
{
  var userName=req.body.userName;
  var passWord=req.body.passWord;
  console.log("login")
  col.findOne({"userName":userName,"passWord":passWord},function(err,data)
   {
	 console.log(data);
	   if(err)
	    {
		  res.send(err)
	    }
	   if (data==null)
	   {
	    res.send("invalid Credential")
	   }
	   else 
	   {
	    res.send("valid Credential")
	   }
   }
);



   })




});
 app.listen(2000);

