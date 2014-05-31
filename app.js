var express = require('express');
var app=express();
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var cookieSession=require('cookie-session');
var port = process.env.PORT || 3000;
app.set('title','Skile');
app.locals.title='Skile';
var MongoClient=require('mongodb').MongoClient;
var db;
MongoClient.connect("mongodb://skile:skilland@kahana.mongohq.com:10089/skile",function(err,database){
	if(!err){
		console.log("We are connected");
		db=database;
	}
});
app.use(bodyParser());
app.use(cookieParser('SuCrEeT'));
app.use(cookieSession({keys:['sec1','sec2']}));
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
				console.log(items[i].password);
				if(items[i].username==user&&items[i].password==pass){

					found = true;
					req.session.user=items[i].username;
					req.session.pass=items[i].password;
					res.redirect('/profile');
				}
			}
			}else{
				console.log(err);
			}
			if(!found){
				res.end(user+' not found');
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
app.get('/profile',function(req,res){
	db.collection('skile').findOne({username:req.session.user,password:req.session.pass},function(err,doc){
		if(!err){
			res.render('profile',{doc:{user:String(doc.username),pass:doc.password,email:doc.email}});
		}
	});
});
app.get('/category',function(req,res){
	res.render('category');
});
app.get('/create',function(req,res){
	res.render('create');
});
var server = app.listen(port,function(){
	console.log('Listening on port %d',port);
});
