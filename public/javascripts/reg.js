$(document).ready(function(){	
	//Ajax gif load
var $loading = $('#aj').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });
	var pass;
	var con_pass;
	$('#pass').on('input',function(){
		pass=$('#pass').val();
		if(con_pass===pass){
			$('span').text('Passwords do not match!').show().fadeOut( 1000 );

		}
	});
	$('#con_pass').on('input',function(){
		con_pass=$('#con_pass').val();
		if(con_pass!=pass){			
			$('span').text('Passwords do not match!').show();
		}
		else{			
			$('span').text('Passwords do not match!').show().fadeOut( 1000 );
		}
	});
	
	$('#reg').submit(function(e){
		if(con_pass!=pass){
			e.preventDefault();
			$('span').text('Passwords do not match!').show();
		}
	});
	/****Category****/
	//**		  **//
		//	**	///
		/*
var next = $('#next');
var limitCat;
var split=$('#nex').attr('href').split('/');
var curr=paresInt(split[split.length-1]);
/*$.get('/limitcat',function(data){
	limitCat=data.limitCat;
	curr=1;
});
$('#nex').attr('href','/category/'+curr);*/
//link matching//

var url;
var urlCheck;
function isUrl(s) {
	var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
	return regex.test(s);
}
$('#url').on('input',function(){
url=$('#url').val();
urlCheck=isUrl(url);
console.log(urlCheck);
});
//toggle add links
$('#add').on('click',function(){
	$(this).text(function(i,text){
		return text==="Add Link" ? "Hide" : "Add Link";
	});
	$('#links2').slideToggle('slow');
});
//search
 $('#search').on('keyup', function(e){
   if(e.keyCode === 13) {
     var parameters = { search: $(this).val() };
     var getAj=  $.get( '/search',parameters, function(data) {
       		if(data.length===0){
       			$('#results').html('Not found');
       			getAj.abort();
       		}
       		else{
       			var res1='<a href='+data[0].url+' '+"><h3>"+data[0].title+"</h3></a>";
		  $('#results').html(res1);
       		}
  	});
    }
 });
 });
