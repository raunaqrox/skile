$(document).ready(function(){
	var isLogged;
	$(document).click(function(){

	$.get("/islogged",function(data){
		isLogged=data;
	});
	var login=$('<li id="/login"><a href="/login">Login</a></li>');
	var logout=$('<li id="/logout"><a href="/logout">Logout</a></li>');
	if(isLogged){
		console.log(isLogged);
		logout.insertAfter($('#home'));
		$('#login').remove();
	}else{
		console.log(isLogged);
		login.insertAfter($('#home'));
		$('#logout').remove();
	}
});
	});