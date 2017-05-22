var express=require('express');
var app=express();
var body=require('body-parser');
var mongo=require('mongodb').MongoClient;
var url="mongodb://127.0.0.1:27017/user";
app.use(body.json());
app.use(body.urlencoded(
{
	extended:true
}));
mongo.connect(url,function(err,db)
{
	if(err)
		console.log(err);
	console.log("connected");
	var col1=db.collection('data');
	
	app.post('/signup',function(req,res)
	{
		var email=req.body.email;
		var password=req.body.pass;
		var phone=req.body.phone;
		if(email.includes(".")==true && email.includes("@")==true)
		{

		    col1.findOne({"email":email,"password":password},function(err,data)
		    {
			
			    if(err)
				    res.send(err);
			    if(data==null)
			    {
				    col1.insert(
                        {email,password,phone}
			        );
		            res.send("Data inserted successfully");
			    }
			    else
			    {
				    res.send("User already exist");
			    }
		    })
	    }
	    else
		    res.send("Enter a valid email");
		

	})
	app.post('/signin',function(req,res)
	{
		var email=req.body.email;
		var password=req.body.pass;

	    col1.findOne({"email":email,"password":password},function(err,doc)
	    	{
	    		if(err)
	    			console.log(err);
	    		if(doc==null)
	    			res.send("incorrect Id or Password");
	    		else
	    			res.send("login successful");
	    		
	    	});	
	})
	
	app.get('/find/:ph',function(req,res)
	{
		var fnd=req.params.ph;

		col1.findOne({$or:[{"password":fnd},{"phone":fnd}]},function(err,data)
		{
			console.log(data);
			if(err)
				console.log(err);
			if(data==null)
				res.send("Phone number or password does not exist");
			else
				res.send(data);
		});
		
	})
	app.get('/update/:email/:pass',function(req,res)
	{
		var email=req.params.email;
		var password=req.params.pass;
		col1.findOne({"email":email,"password":password},function(err,data)
		{
			if(err)
				res.send(err);
			if(data==null)
				res.send("Phone number or password does not exist");
			else
			{
				console.log(data);
				var uemail=req.headers.uemail;
				var upassword=req.headers.upass;
				var uphone=req.headers.uphone;
				if(uemail==undefined)
					uemail=email;
				if(upassword==undefined)
					upassword=password;
				if(uphone==undefined)
					uphone=data.phone;
				col1.update({"email":email,"password":password},{$set:{"email":uemail,"password":upassword,"phone":uphone}},function(err,data)
				{
					if(err)
						res.send(err);
					else
						res.send("successfully updated...");
				})
			}
		})
	})

});
app.listen(8000);
