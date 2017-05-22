var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongo=require('mongodb');
var validator = require('express-validator');

app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(bodyParser.json());
app.use(validator());
mongo.connect("mongodb://127.0.0.1/login",function(err,db){
	   if(err)
	   	console.log(err)
	    var col1= db.collection('collection1');

	  
	 app.post('/signup',function(req,res){
		
	  	 email=req.body.email;
	  	 password=req.body.password;
       
       if(email.includes('@')==true&& email.includes(".")==true && password!=""){
			col1.findOne({"email":email,"password":password},function(err,data){

				if(err)
					console.log(err);
				if(data==null){
					col1.insertOne({
		        		"email":email,
						"password":password
					})
	       			 res.send("sign up successful");
				}
				else
					res.send("user already exists");
				
		});
	   }
	   else
	   	res.send("please enter a valid email");
	});

	app.post('/login',function(req,res){
        var email=req.body.email;
	    var password=req.body.password;

	    col1.findOne({"email":email, "password":password},function(err,data){
	    	if(data==null){
	    		res.send("email id or password is incorrect");
	    	}
	    	else{
	    		res.send("login successful");
	    	}
	   })
	})
    
	app.get('/details/:phone',function(req,res){
		val=req.params.phone;
		
		col1.findOne({$or:[{"phone":val},{"password":val}]},function(err,data){
			res.send(data);
		})
    })

    app.get('/update/:email/:password',function(req,res){
         var email=req.params.email;
         var password=req.params.password;
       col1.findOne({"email":email, "password":password},function(err,data){
         	if(err){
         		res.send(err);
         	}
         	else{
         		var email=req.headers.email;
         		var phone=req.headers.phone;
         		var password=req.headers.password;
         		if(email==undefined)
         			email=data.email;
         		if(phone==undefined)
                    phone=data.phone;
                if(password==undefined)
                	password=data.password;
         		col1.update({"email":email},{$set:{"phone":phone,"password":password}},function(err,data){
                       if(err){
                        	console.log(err)
                       }
                   		else{
                      	    console.log(data)
                      	}
                });
         	}
        })
    }); 
         
	
})
app.listen(3000);
