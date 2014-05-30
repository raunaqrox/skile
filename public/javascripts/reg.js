$(document).ready(function(){	
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
		else{			
		}
	});
});
