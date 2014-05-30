var express = require('express');
var app=express();
var bodyParser=require('body-parser');
var port = process.env.PORT || 3000;
var MongoClient=require('mongodb').MongoClient;
var db;
MongoClient.connect("mongodb://skile:skilland@kahana.mongohq.com:10089/skile",function(err,database){
	if(!err){
		console.log("We are connected");
		db=database;
	}
});
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.get('/',function(req,res){
	res.render('index');
});
app.get('/login',function(req,res){
	res.render('login');
});
app.post('/login',function(req,res){
	var found=false;
	var user=req.body.user;
	var pass=req.body.pass;
	db.collection('skile').find().toArray(function(err,items){
		if(!err){
			for(var i=0;i<items.length;i++){
				console.log(items[i].username);
				if(items[i].username==user&&items[i].password==pass){
					res.send('Welcome '+user);
					found = true;
				}
			}
			}else{
				console.log(err);
			if(!found){
				res.send(user+' not found');
			}	
		}
	});
});

app.post('/register',function(req,res){

	var user={
		username:req.body.user,
		password:req.body.pass,
		email:req.body.email
	}
	db.collection('skile').insert(user,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(user.username+' added');
		}
	});
});
app.get('/register',function(req,res){
	res.render('register');
});

var server = app.listen(port,function(){
	console.log('Listening on port %d',port);
});
