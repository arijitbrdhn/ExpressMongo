var express=require('express');
var fs=require('fs');
var app=express();
var body=require('body-parser');
var mongoose=require('mongoose');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var schema=mongoose.Schema;
var url="mongodb://127.0.0.1:27017/affle";
app.use(body.json());
app.use(body.urlencoded({
	extended:true
}));
app.use('upload');
var imgSchema=new schema({
    image:{data:Buffer, contentType:String}
});
mongoose.connect(url,function(err){
	if(err)
    res.send(err);
});

var model=mongoose.model('image',imgSchema);

app.post('/uploads',function(req,res){
    var dp=new model();
    dp.image.data = fs.readFileSync(req.files.userPhoto.path);
		dp.save(function(err){
			if(err)
				res.send(err);
			res.send("Data saved successfully");
		})
	});

app.listen(1200);
	